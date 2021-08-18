CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    text VARCHAR,
    location VARCHAR NOT NULL,
    event_date DATE
);
