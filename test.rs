pub mod events {
    use crate::{
        auth::Token,
        data::{defs::*, Lang},
    };
    use chrono::naive::*;
    use diesel::{prelude::*, Insertable, Queryable};
    use rocket::{http::Status, request::Form, response::Redirect, State};
    use rocket_contrib::{json::Json, templates::Template};
    use serde::Serialize;
    use std::{collections::*, sync::Mutex};
    pub mod schema {
        table! { use diesel :: sql_types :: * ; events (id) { id -> Integer , lang -> Text , title -> Text , location -> Text , text -> Text , event_date -> Text , } }
    }
    use schema::events;
    #[derive(Debug, Clone, Queryable, Serialize)]
    pub struct Get {
        pub id: i32,
        pub lang: String,
        pub title: String,
        pub location: String,
        pub text: String,
        pub event_date: NaiveDate,
    }
    #[derive(Debug, AsChangeset, Insertable)]
    #[table_name = "events"]
    pub struct Create {
        pub lang: String,
        pub title: String,
        pub location: String,
        pub text: String,
        pub event_date: NaiveDate,
    }
    #[derive(Debug, FromForm)]
    pub struct Post {
        pub lang: String,
        pub title: String,
        pub location: String,
        pub text: String,
        pub event_date: DateForm,
    }
    #[derive(Debug, FromForm)]
    pub struct Update {
        pub id: i32,
        pub lang: String,
        pub title: String,
        pub location: String,
        pub text: String,
        pub event_date: DateForm,
    }
    #[derive(Debug, FromForm)]
    pub struct Delete {
        pub id: i32,
    }
    impl Post {
        fn convert(self) -> Create {
            Create {
                lang: self.lang,
                title: self.title,
                location: self.location,
                text: self.text,
                event_date: *self.event_date,
            }
        }
    }
    impl Update {
        fn convert(self) -> Create {
            Create {
                lang: self.lang,
                title: self.title,
                location: self.location,
                text: self.text,
                event_date: *self.event_date,
            }
        }
    }
    pub fn create(conn: &PgConnection, create: Create) -> Result<Get, diesel::result::Error> {
        diesel::insert_into(events::table)
            .values(&create)
            .get_result(conn)
    }
    pub fn get(conn: &PgConnection, lg: Lang) -> Result<Vec<Get>, diesel::result::Error> {
        use schema::events::dsl::*;
        events.filter(lang.eq(lg.0)).load::<Get>(conn)
    }
    pub fn get_all(conn: &PgConnection) -> Result<Vec<Get>, diesel::result::Error> {
        use schema::events::dsl::*;
        events.load::<Get>(conn)
    }
    pub fn update(
        conn: &PgConnection,
        idn: i32,
        create: Create,
    ) -> Result<Get, diesel::result::Error> {
        use schema::events::dsl::*;
        diesel::update(events.find(idn))
            .set(&create)
            .get_result::<Get>(conn)
    }
    pub fn delete(conn: &PgConnection, idn: i32) -> Result<usize, diesel::result::Error> {
        use schema::events::dsl::*;
        diesel::delete(events.find(idn)).execute(conn)
    }
    #[get("/<lang>/events")]
    pub fn api(pg: State<Mutex<PgConnection>>, lang: Lang) -> Result<Json<Vec<Get>>, Status> {
        Ok(Json(
            get(&*(pg.lock().unwrap()), lang).map_err(|_| Status::InternalServerError)?,
        ))
    }
    #[post("/events/add", data = "<form>")]
    pub fn add(
        _token: Token,
        pg: State<Mutex<PgConnection>>,
        form: Form<Post>,
    ) -> Result<Redirect, Status> {
        match create(&*(pg.lock().unwrap()), form.into_inner().convert()) {
            Ok(_) => Ok(Redirect::to("/ui/events")),
            Err(_) => Err(Status::InternalServerError),
        }
    }
    #[post("/events/del", data = "<form>")]
    pub fn del(
        _token: Token,
        pg: State<Mutex<PgConnection>>,
        form: Form<Delete>,
    ) -> Result<Redirect, Status> {
        match delete(&*(pg.lock().unwrap()), form.id) {
            Ok(_) => Ok(Redirect::to("/ui/events")),
            Err(_) => Err(Status::InternalServerError),
        }
    }
    #[post("/events/upd", data = "<form>")]
    pub fn upd(
        _token: Token,
        pg: State<Mutex<PgConnection>>,
        form: Form<Update>,
    ) -> Result<Redirect, Status> {
        match update(&*(pg.lock().unwrap()), form.id, form.into_inner().convert()) {
            Ok(_) => Ok(Redirect::to("/ui/events")),
            Err(_) => Err(Status::InternalServerError),
        }
    }
    #[get("/events")]
    pub fn ui(_token: Token, pg: State<Mutex<PgConnection>>) -> Result<Template, Status> {
        let ctx = get_all(&*(pg.lock().unwrap()))
            .map_err(|_| Status::InternalServerError)?
            .iter()
            .map(|x| (x.id, x.clone()))
            .collect::<HashMap<i32, Get>>();
        Ok(Template::render("events", &ctx))
    }
}
