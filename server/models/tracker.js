const {db} = require('../db/init');

module.exports = class Tracker {
    constructor(data){
        this.id = data.id
        this.habit_id = data.habitId
        this.dailyValue = data.dailyValue
        this.date = data.date
        this.userId = data.userId
    }

    static create ({ id, havitId, dailyValue, date, userId}){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO habits (id, havitId, dailyValue, date, userId)
                                                VALUES ($1, $2, $3, $4, $5) RETURNING *;`,[id, havitId, dailyValue, date, userId]);
                let tracker = new Tracker(result.rows[0]);
                res(user)
            } catch (err) {
                rej(`Error creating user: ${err}`)
            }
        })
    }
};
