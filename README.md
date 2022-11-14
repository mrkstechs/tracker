# Tracker

## Installation & Usage

### Installation
- `clone` or download this repo
- `cd` into `tracker`
- `cd` into `server`
- `run npm i` to install dependencies
- Add .env file in root directory with `PASS` variable equal to a secret key

### Usage
- have `docker desktop` running on your machine
- make sure your in the `server` directory
- type `npm run up` to start up the `db`
- type `npm run dev` in another `terminal` 

#### Paths available:
##### `/api/users`
    - GET: displays all users
    - POST: add user to database `{ email, firstName, lastName, username, password }`
##### `/api/habits`
    - GET: displays all habits
    - POST: add habit to database `{ habit, recommended_daily_goal, recommended_weekly_goal }`
##### `/api/trackers`
    - GET: displays all trackers
    - POST: add tracker to database `{ habitId, dailyValue, date, userId }`