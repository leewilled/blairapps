#[macro_use] extern crate diesel;
#[macro_use] extern crate rocket;

mod utils;
mod data;

use clap::{App, Arg};
use rocket::{Build, Rocket};
use utils::{exit_with_error, db_conn};
use dotenv::dotenv;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}


fn rocket(port: u32) -> Rocket<Build> {
    let figment = rocket::Config::figment()
        .merge(("port", port));
    rocket::custom(figment)
        .mount("/", routes![index])

}


#[rocket::main]
async fn main() {  
    dotenv().ok();

    let postgres = db_conn("/postgres")
        .unwrap_or_else(|_| exit_with_error("Error connecting to database. "));


    let matches = App::new("blazercms")
        .version("1.0")
        .arg(Arg::with_name("port")
             .short("p")
             .long("port")
             .default_value("8080"))
        .get_matches();

    let port = matches
        .value_of("port")
        .unwrap()
        .parse::<u32>()
        .unwrap_or_else(|_| exit_with_error("Port must be an integer! "));

    if let Err(_) = rocket(port).launch().await {
        exit_with_error(&format!("Error binding port {}. ", port));
    }
}

