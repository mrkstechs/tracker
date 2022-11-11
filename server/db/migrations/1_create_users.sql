DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    email VARCHAR(127) NOT NULL,
    firstname VARCHAR(63) NOT NULL,
    lastname VARCHAR(63) NOT NULL,
    username VARCHAR(63) NOT NULL,
    password VARCHAR(127) NOT NULL
)