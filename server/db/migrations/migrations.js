const {db} = require('../init')
const fs = require('fs');

const users = fs.readFileSync(__dirname + '/1_create_users.sql').toString()
const habits = fs.readFileSync(__dirname + '/1_create_habits.sql').toString()
const goals = fs.readFileSync(__dirname + '/2_create_goals.sql').toString()
const tracker = fs.readFileSync(__dirname + '/2_create_tracker.sql').toString()

db.query(users, () => console.log(`created users table`))
db.query(habits, () => console.log(`created habits table`))
db.query(goals, () => console.log(`created goals table`))
db.query(tracker, () => console.log(`created tracker table`))
