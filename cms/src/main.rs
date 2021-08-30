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


#[get("/")]
fn index() -> Template {
    let context: HashMap<&str, &str> = [("oauth", "/oauth")].iter().cloned().collect();
    Template::render("index", &context)
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
            routes![index, auth::callback, auth::oauth, static_files],
        )
        .mount("/api", routes![data::events::api])
        .mount(
            "/ui",
            routes![
                data::events::ui,
                data::events::add,
                data::events::del,
                data::events::upd
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