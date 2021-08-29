use diesel::{prelude::*, Queryable};
use oauth2::{
    basic::BasicClient, reqwest::http_client, AuthUrl, AuthorizationCode, ClientId, ClientSecret,
    CsrfToken, RedirectUrl, RevocationUrl, Scope, TokenResponse, TokenUrl,
};
use reqwest::blocking::Client;
use rocket::{
    http::{Cookie, Cookies, SameSite, Status},
    request,
    request::FromRequest,
    response::Redirect,
    Outcome, Request, State,
};
use serde::Serialize;
use serde_json::Value;
use std::{fmt::Debug, sync::Mutex};

mod schema {
    table! {
        use diesel::sql_types::*;

        auth_val (id) {
            id -> Integer,
            email -> Text,
        }
    }
}

pub struct Host(String);
pub struct Token(String);

#[derive(Clone)]
pub struct Settings {
    pub id: String,
    pub secret: String,
    pub auth_url: AuthUrl,
    pub token_url: TokenUrl,
}

#[derive(Debug, Queryable, Serialize)]
struct Auth {
    pub id: i32,
    pub email: String,
}

fn get_auth(conn: &PgConnection) -> Result<Vec<Auth>, diesel::result::Error> {
    use schema::auth_val::dsl::*;
    auth_val.load::<Auth>(conn)
}

impl<'a, 'r> FromRequest<'a, 'r> for Host {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> request::Outcome<Self, Self::Error> {
        let host = request.headers().get_one("Host");
        match host {
            Some(host) => Outcome::Success(Host(host.to_string())),
            None => Outcome::Failure((Status::Unauthorized, ())),
        }
    }
}

impl<'a, 'r> FromRequest<'a, 'r> for Token {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> request::Outcome<Self, Self::Error> {
        match request.cookies().get("token") {
            Some(token) => {
                let resp: Value = Client::new()
                    .get("https://www.googleapis.com/userinfo/v2/me")
                    .bearer_auth(token.name_value().1)
                    .send()
                    .unwrap()
                    .json()
                    .unwrap();

                if resp["error"] != Value::Null {
                    return Outcome::Failure((Status::Forbidden, ()));
                } else {
                    let email = resp["email"].clone();
                    let pg = request.guard::<State<Mutex<PgConnection>>>()?;
                    let diesel_op = get_auth(&*(pg.lock().unwrap()));
                    let auths: Vec<String> = match diesel_op {
                        Ok(n) => n.into_iter().map(|x| x.email).collect::<Vec<String>>(),
                        Err(_) => vec![],
                    };

                    if auths.into_iter().any(|x| x == email.as_str().unwrap_or("")) {
                        return Outcome::Success(Token(String::from(email.as_str().unwrap_or(""))));
                    } else {
                        return Outcome::Failure((Status::Forbidden, ()));
                    }
                }
            }
            None => Outcome::Failure((Status::Unauthorized, ())),
        }
    }
}

#[get("/oauth")]
pub fn oauth(
    mut cookies: Cookies,
    settings: State<Settings>,
    host: Host,
) -> Result<Redirect, Status> {
    let client = get_client(settings.inner().clone(), host);
    let csrf_token = CsrfToken::new_random();
    let csrf: String = csrf_token.secret().into();
    cookies.add(Cookie::new("state", csrf));
    let (authorize_url, _csrf_state) = client
        .authorize_url(|| csrf_token.clone())
        .add_scope(Scope::new(
            "https://www.googleapis.com/auth/userinfo.email".to_owned(),
        ))
        .url();
    let auth = authorize_url.to_string();
    Ok(Redirect::to(auth))
}

#[get("/logout")]
pub fn logout(mut cookies: Cookies) -> Redirect {
    match cookies.get("token") {
        Some(_) => {
            cookies.remove(Cookie::named("token"));
            Redirect::to("/")
        }
        None => Redirect::to("/"),
    }
}

#[get("/callback?<state>&<code>")]
pub fn callback(
    state: String,
    code: String,
    pg: State<Mutex<PgConnection>>,
    mut cookies: Cookies,
    host: Host,
    sa: State<Settings>,
) -> Result<Redirect, Status> {
    let sc = cookies.get("state");
    match sc {
        Some(c) => {
            if state != c.value() {
                return Err(Status::Forbidden);
            } else {
                cookies.remove(Cookie::named("state"));
                let client = get_client(sa.inner().clone(), host);
                let token_result = client
                    .exchange_code(AuthorizationCode::new(code))
                    .request(http_client);
                match token_result {
                    Ok(n) => {
                        let secret = n.access_token().secret();

                        let resp: Value = Client::new()
                            .get("https://www.googleapis.com/userinfo/v2/me")
                            .bearer_auth(secret)
                            .send()
                            .unwrap()
                            .json()
                            .unwrap();
                        if resp["error"] != Value::Null {
                            return Err(Status::BadRequest);
                        } else {
                            let email = resp["email"].clone();
                            let diesel_op = get_auth(&*(pg.lock().unwrap()));
                            let auths: Vec<String> = match diesel_op {
                                Ok(n) => n.into_iter().map(|x| x.email).collect::<Vec<String>>(),
                                Err(_) => vec![],
                            };
                            if auths.into_iter().any(|x| x == email.as_str().unwrap_or("")) {
                                let mut cook = Cookie::new("token", secret.to_string());
                                cook.set_same_site(SameSite::Strict);
                                cook.set_http_only(true);
                                cook.set_secure(true);
                                cookies.add(cook);
                                return Ok(Redirect::to("/"));
                            } else {
                                return Err(Status::Forbidden);
                            }
                        }
                    }
                    Err(_) => return Err(Status::InternalServerError),
                }
            }
        }
        None => Err(Status::BadRequest),
    }
}

pub fn get_client(settings: Settings, host: Host) -> BasicClient {
    let gcid = ClientId::new(settings.id);

    let gcs = ClientSecret::new(settings.secret);

    let auth_url = settings.auth_url;
    let token_url = settings.token_url;

    let base: String = host.0.to_owned();

    BasicClient::new(gcid, Some(gcs), auth_url, Some(token_url))
        .set_redirect_uri(
            RedirectUrl::new(format!("http://{}/callback", base)).expect("Invalid redirect URL"),
        )
        .set_revocation_uri(
            RevocationUrl::new("https://oauth2.googleapis.com/revoke".to_owned())
                .expect("Invalid revocation endpoint URL"),
        )
}
