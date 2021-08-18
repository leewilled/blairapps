
table! {
    use diesel::sql_types::*;

    events (id) {
        id -> Integer,
        title -> Text,
        text -> Text,
        location -> Text,
        event_date -> Date,
    }
}
