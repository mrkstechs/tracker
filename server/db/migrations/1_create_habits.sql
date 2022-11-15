DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
    id serial PRIMARY KEY,
    habit VARCHAR(30) NOT NULL,
    recommended_daily_goal VARCHAR(20),
    recommended_weekly_goal VARCHAR(20)
)