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
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    position VARCHAR NOT NULL,
    image VARCHAR
);

CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    lang VARCHAR,
    message VARCHAR NOT NULL,
    teacher VARCHAR NOT NULL,
    date DATE,
    time TIME
);

CREATE TABLE clubs (
    id SERIAL PRIMARY KEY,
    lang VARCHAR,
    name VARCHAR NOT NULL,
    meeting VARCHAR NOT NULL,
    link VARCHAR NOT NULL,
    sponsor VARCHAR NOT NULL
);

CREATE TABLE lunch_events (
    id SERIAL PRIMARY KEY,
    lang VARCHAR,
    title VARCHAR NOT NULL,
    text VARCHAR NOT NULL,
    location VARCHAR NOT NULL,
    time TIME
);

CREATE TABLE ssl_ops (
    id SERIAL PRIMARY KEY,
    lang VARCHAR,
    title VARCHAR NOT NULL,
    text VARCHAR NOT NULL,
    location VARCHAR NOT NULL,
    teacher VARCHAR NOT NULL,
    date DATE
);

CREATE TABLE polls (
    id SERIAL PRIMARY KEY,
    lang VARCHAR,
    url VARCHAR NOT NULL
);

CREATE TABLE new (
    id SERIAL PRIMARY KEY,
    lang VARCHAR,
    image VARCHAR,
    name VARCHAR NOT NULL,
    new_date DATE
);

CREATE TABLE challenge (
    id SERIAL PRIMARY KEY,
    lang VARCHAR,
    title VARCHAR NOT NULL, 
    text VARCHAR NOT NULL,
    link VARCHAR NOT NULL
);

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    lang VARCHAR,
    name VARCHAR NOT NULL,
    image VARCHAR,
    grade VARCHAR NOT NULL,
    messages VARCHAR NOT NULL,
    hobbies VARCHAR NOT NULL,
    achievements VARCHAR NOT NULL
);

CREATE TABLE important (
    id SERIAL PRIMARY KEY,
    lang VARCHAR,
    image VARCHAR,
    text VARCHAR NOT NULL
);


