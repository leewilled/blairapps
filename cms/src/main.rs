#![feature(decl_macro)]
#[macro_use]
extern crate diesel;
#[macro_use]
extern crate diesel_migrations;
#[macro_use]
extern crate rocket;

mod auth;
mod data;
mod secret;
mod utils;

use auth::Settings;
use clap::{App, Arg};
use diesel::prelude::*;
use dotenv::dotenv;
use oauth2::{AuthUrl, TokenUrl};
use rocket::{
    config::{Config, Environment},
    Rocket,
};
use rocket_contrib::templates::Template;
use std::{
    collections::*,
    env,
    net::IpAddr,
    path::{Path, PathBuf},
    sync::Mutex,
};
use utils::{db_conn, exit_with_error};
use rocket::response::Redirect;
use auth::Token;



#[get("/")]
fn home(_token: Token) -> Template {
    let context: HashMap<&str, &str> = HashMap::new();
    Template::render("home", &context)
}

#[get("/", rank=2)]
fn home_not_logged_in() -> Redirect {
    Redirect::to(uri!(login))
}

#[get("/login")]
fn login() -> Template {
    let context: HashMap<&str, &str> = [("oauth", "/oauth")].iter().cloned().collect();
    Template::render("login", &context)
}



#[get("/static/<path..>")]
fn static_files(path: PathBuf) -> Option<rocket::response::NamedFile> {
    rocket::response::NamedFile::open(Path::new("cms/static/").join(path)).ok()
}

fn rocket(port: u16, address: String, env: Environment, pg: PgConnection, sa: Settings) -> Rocket {
    let mut config = Config::build(env)
        .port(port)
        .address(address)
        .secret_key(secret::create_secret())
        .unwrap();
    let mut extras = HashMap::new();
    extras.insert("template_dir".to_string(), "cms/templates/".into());
    config.set_extras(extras);
    rocket::custom(config)
        .attach(Template::fairing())
        .manage(Mutex::new(pg))
        .manage(sa)
        .mount(
            "/",
            routes![home, home_not_logged_in, login, auth::callback, auth::oauth, static_files],
        )
        .mount("/api", routes![
            data::student::api,
               data::events::api,
               data::teachers::api,
               data::announcements::api,
               data::clubs::api,
               data::lunch_events::api,
               data::ssl_ops::api,
               data::calendar::api,
               data::polls::api,
               data::new::api,
               data::important::api,
               data::challenge::api,
        ])
        .mount(
            "/ui",
            routes![
             data::student::eui, data::events::eui, data::teachers::eui, data::announcements::eui, data::clubs::eui, data::lunch_events::eui, data::ssl_ops::eui, data::calendar::eui, data::polls::eui, data::new::eui, data::challenge::eui, data::important::eui, 
             data::student::upd, data::events::upd, data::teachers::upd, data::announcements::upd, data::clubs::upd, data::lunch_events::upd, data::ssl_ops::upd, data::calendar::upd, data::polls::upd, data::new::upd, data::challenge::upd, data::important::upd,
             data::student::del, data::events::del, data::teachers::del, data::announcements::del, data::clubs::del, data::lunch_events::del, data::ssl_ops::del, data::calendar::del, data::polls::del, data::new::del, data::challenge::del, data::important::del,
             data::student::add, data::events::add, data::teachers::add, data::announcements::add, data::clubs::add, data::lunch_events::add, data::ssl_ops::add, data::calendar::add, data::polls::add, data::new::add, data::challenge::add, data::important::add,
            ],
        )
}

fn main() {
    dotenv().ok();

    let gcid = env::var("BLAZERCMS_CLIENT_ID")
        .unwrap_or_else(|_| exit_with_error("BLAZERCMS_CLIENT_ID must be set"));

    let gcs = env::var("BLAZERCMS_SECRET")
        .unwrap_or_else(|_| exit_with_error("BLAZERCMS_SECRET must be set"));

    let auth_url = AuthUrl::new("https://accounts.google.com/o/oauth2/v2/auth".to_owned())
        .expect("Invalid authorization endpoint.");

    let token_url = TokenUrl::new("https://www.googleapis.com/oauth2/v3/token".to_owned())
        .expect("Invalid token endpoint. ");

    let postgres = db_conn();

    let matches = App::new("blazercms")
        .version("1.0")
        .arg(
            Arg::with_name("port")
                .short("p")
                .long("port")
                .default_value("8080"),
        )
        .arg(
            Arg::with_name("prod")
                .short("r")
                .long("prod")
                .takes_value(false),
        )
        .arg(
            Arg::with_name("addr")
                .short("a")
                .long("addr")
                .default_value("127.0.0.1"),
        )
        .get_matches();

    let port = matches
        .value_of("port")
        .unwrap()
        .parse::<u16>()
        .unwrap_or_else(|_| exit_with_error("Port must be an integer! "));

    let addr = matches
        .value_of("addr")
        .unwrap()
        .parse::<IpAddr>()
        .unwrap_or_else(|_| exit_with_error("Address must be a valid IP Address! "))
        .to_string();

    let env;
    if matches.is_present("prod") {
        env = Environment::Production;
    } else {
        env = Environment::Development;
    }

    let auth_settings = Settings {
        id: gcid,
        secret: gcs,
        auth_url: auth_url,
        token_url: token_url,
    };

    let err = rocket(port, addr, env, postgres, auth_settings).launch();
    exit_with_error(&format!("Error: {}", err));
}
