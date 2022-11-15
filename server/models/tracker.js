const {db} = require('../db/init');

module.exports = class Tracker {
    constructor(data){
        this.id = data.id
        this.habitId = data.habit_id
        this.dailyValue = data.dailyValue
        this.date = data.date
        this.userId = data.user_id
    }

    static create ({ habitId, dailyValue, date, userId}){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO tracker (habit_id, habit_daily_value, date, user_id)
                                                VALUES ($1, $2, $3, $4) RETURNING *;`,[habitId, dailyValue, date, userId]);
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
};
