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

##### `/users`
    - GET: displays all users
##### `/users/login`    
    - POST: login to site `{username, password}`
##### `/users/register`  
    - POST: add user to database `{ email, firstName, lastName, username, password }`

##### `/habits`
    - GET: displays all habits
    - POST: add habit to database `{ habit, recommended_daily_goal, recommended_weekly_goal }`

##### `/trackers`
    - GET: displays all trackers
    - POST: add tracker to database `{ habitId, dailyValue, date, userId }`
##### `/trackers/:userid`
    - GET: displays all trackers with user id
##### `/trackers/:userid/:habitid`
    - GET: displays only trackers of a specified habit with user id

##### `/goals`
    - GET: displays all goals
    - POST: adds new goal to database `{ userId, habitId, dailyGoal, weeklyGoal, goalUnits }`