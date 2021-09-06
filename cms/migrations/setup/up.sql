CREATE TABLE auth_val (
    id SERIAL PRIMARY KEY,
    email VARCHAR
);

INSERT INTO auth_val(email) VALUES('blazercmstest@gmail.com');

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    lang VARCHAR,
    title VARCHAR NOT NULL,
    text VARCHAR,
    location VARCHAR NOT NULL,
    event_date DATE
);
