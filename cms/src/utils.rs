use ansi_term::Colour::Red;
use diesel::prelude::*;
use diesel::pg::{PgConnection};
use std::{env};

pub fn exit_with_error(msg: &str) -> ! {
    eprintln!("{}", Red.paint(msg));
    std::process::exit(1);
}



pub fn db_conn(dbname: &str) -> Result<PgConnection, ConnectionError> {

    let mut database_url = env::var("BLAZERCMS_DATABASE_URL")
        .unwrap_or_else(|_| exit_with_error("BLAZERCMS_DATABASE_URL must be set"));

    database_url.push_str(dbname);

    PgConnection::establish(&database_url)
}
