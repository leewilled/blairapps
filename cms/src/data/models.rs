use super::schema::events;
use diesel::Insertable;
use diesel::Queryable;
use chrono::naive::NaiveDate;

#[derive(Queryable)]
pub struct Event {
    pub id: i32,
    pub title: String,
    pub location: String,
    pub text: String,
    pub event_date: NaiveDate,
}

#[derive(Insertable)]
#[table_name="events"]
pub struct NewEvent<'a> {
    pub title: &'a str,
    pub location: &'a str,
    pub text: &'a str,
    pub event_date: &'a NaiveDate
}
