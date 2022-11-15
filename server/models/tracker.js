const {db} = require('../db/init');

module.exports = class Tracker {
    constructor(data){
        this.id = data.id
        this.habitId = data.habit_id
        this.dailyValue = data.habit_daily_value
        this.date = data.date
        this.userId = data.user_id
    }

    static create ({ habitId, dailyValue, userId}){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO tracker (habit_id, habit_daily_value, date, user_id)
                                                VALUES ($1, $2, CURRENT_DATE, $3) RETURNING *;`,[habitId, dailyValue, userId]);
                let tracker = new Tracker(result.rows[0]);
                res(tracker)
            } catch (err) {
                rej(`Error creating user: ${err}`)
            }
        })
    }

    static get all(){
        return new Promise (async (res, rej) => {
            try {
                let result = await db.query('SELECT * FROM tracker');
                let trackers = result.rows.map(t => new Tracker(t));
                res(trackers);
            } catch (err) {
                rej('Trackers not found: ${err}');
            }
        });
    };
    
    static updateDailyValue (trackerId, newDailyValue){
        return new Promise (async (res, rej) => {
            try {
                let updatedData = await db.query('UPDATE tracker SET habit_daily_value = $1 WHERE id = $2', [ newDailyValue, trackerId ])
                res.json(updatedData)
            } catch (err) {
                rej(`Unable to update value: ${err}`)
            }
        })
    }

    static findByUserId (userId) {
        return new Promise (async (res, rej) => {
            try {
                let result = await db.query('SELECT * FROM tracker WHERE user_id = $1', [userId]);
                let trackers = result.rows.map(t => new Tracker(t));
                res(trackers);
            } catch (err) {
                rej(`No trackers found for this UserId: ${err}`);
            }
        })
    }

    static findByUserAndHabit (userId, habitId) {
        return new Promise (async (res, rej) => {
            try {
                let result = await db.query('SELECT * FROM tracker WHERE user_id = $1 AND habit_id = $2', [userId , habitId]);
                let trackers = result.rows.map(t => new Tracker(t));
                res(trackers);
            } catch (err) {
                rej(`No trackers found for this user and habit: ${err}`)
            }
        })
    }

    static findByUserHabitAndDate (userId, habitId, date) {
        return new Promise (async (res, rej) => {
            try {
                let result = await db.query('SELECT * FROM tracker WHERE user_id = $1 AND habit_id = $2 AND date = $3', [userId , habitId, date]);
                let tracker = new Tracker(result.rows[0]);
                res(tracker);
            } catch (err) {
                rej(`No trackers found for this user and habit: ${err}`)
            }
        })
    }
};
