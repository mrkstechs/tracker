const {db} = require('../db/init');

module.exports = class Tracker {
    constructor(data){
        this.id = data.id
        this.habit_id = data.habitId
        this.dailyValue = data.dailyValue
        this.date = data.date
        this.userId = data.userId
    }

    static create ({ habitId, dailyValue, date, userId}){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO tracker (id, havitId, dailyValue, date, userId)
                                                VALUES ($1, $2, $3, $4) RETURNING *;`,[habitId, dailyValue, date, userId]);
                let tracker = new Tracker(result.rows[0]);
                res(user)
            } catch (err) {
                rej(`Error creating user: ${err}`)
            }
        })
    }

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let result = await db.query('SELECT * FROM tracker');
                let trackers = result.rows.map(d => new Tracker(d));
                resolve (trackers);
            } catch (err) {
                reject('Trackers not found');
            }
        });
    };
};
