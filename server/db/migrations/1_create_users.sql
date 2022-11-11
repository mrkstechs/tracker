DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY.
    email VARCHAR(127) NOT NULL,
    firstName VARCHAR(63) NOT NULL,
    lastName VARCHAR(63) NOT NULL,
    username VARCHAR(63) NOT NULL,
    password VARCHAR(127) NOT NULL
)