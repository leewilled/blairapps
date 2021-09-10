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
    event_date DATE,
    name VARCHAR NOT NULL,
    emails VARCHAR NOT NULL
);


CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    lang VARCHAR,
    name VARCHAR NOT NULL,
    emails VARCHAR[]
);


CREATE TABLE new (
    id SERIAL PRIMARY KEY,
    lang VARCHAR,
    image VARCHAR,
    name VARCHAR NOT NULL,
    new_date DATE
);
