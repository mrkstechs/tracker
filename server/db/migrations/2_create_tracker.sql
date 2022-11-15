DROP TABLE IF EXISTS tracker;

CREATE TABLE tracker (
    id serial PRIMARY KEY,
    habit_id INTEGER REFERENCES habits (id),
    habit_daily_value INT NOT NULL,
    date DATE NOT NULL,
    user_id INTEGER REFERENCES users (id)
);