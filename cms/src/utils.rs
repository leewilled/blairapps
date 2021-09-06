use ansi_term::Colour::Red;
use diesel::{pg::PgConnection, prelude::*};
use std::env;

pub fn exit_with_error(msg: &str) -> ! {
    eprintln!("{}", Red.paint(msg));
    std::process::exit(1);
}

pub fn db_conn() -> PgConnection {
    embed_migrations!("migrations");

    let database_url = env::var("BLAZERCMS_DATABASE_URL")
        .unwrap_or_else(|_| exit_with_error("BLAZERCMS_DATABASE_URL must be set"));

    let db = PgConnection::establish(&database_url)
        .unwrap_or_else(|_| exit_with_error("Error connecting to database. "));

    embedded_migrations::run(&db).unwrap_or_else(|_| exit_with_error("Error migrating database. "));
    db
}
