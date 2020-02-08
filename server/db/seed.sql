-- DROP DATABASE IF EXISTS youtube;
-- CREATE DATABASE youtube;

-- \c youtube;

CREATE TABLE users
(
    id SERIAL,
    username VARCHAR NOT NULL UNIQUE PRIMARY KEY,
    password_digest VARCHAR NOT NULL
);

CREATE TABLE history
(
    id SERIAL PRIMARY KEY,
    video_id VARCHAR NOT NULL,
    username VARCHAR REFERENCES users(username)
);