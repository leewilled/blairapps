use diesel::prelude::*;
use super::models::{Event, NewEvent};
use super::super::utils::{exit_with_error};

pub fn create_event(conn: &PgConnection, event: NewEvent) -> Event {

    use super::schema::events;
    diesel::insert_into(events::table)
    .values(&event)
    .get_result(conn)
    .unwrap_or_else(|_| exit_with_error("Error saving new post"))

}

pub fn get_all(conn: &PgConnection) -> Result<Vec<Event>, diesel::result::Error> {

    use super::schema::events::dsl::*;

    events.load::<Event>(conn)
}
