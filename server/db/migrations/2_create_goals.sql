DROP TABLE IF EXISTS goals;

CREATE TABLE goals (
    id serial PRIMARY KEY,
    user_id INTEGER REFERENCES users (id)
    habit_id INTEGER REFERENCES habits (id),
    daily_goal INT,
    weekly_goal INT,
    goal_units VARCHAR(15)
);