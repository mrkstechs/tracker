const {db} = require('../db/init');

module.exports = class habit {
    constructor(data){
        this.id = data.id
        this.habit = data.habit
        this.recommended_daily_goal = data.recommended_daily_goal
        this.recommended_weekly_goal = data.recommended_weekly_goal
    }

    static create ({id, habit, recommended_daily_goal, recommended_weekly_goal}){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO habits (id, habit, recommended_daily_goal, recommended_weekly_goal)
                                                VALUES ($1, $2, $3, $4, $5) RETURNING *;`,[id, habit, recommended_daily_goal, recommended_weekly_goal]);
                let habit = new User(result.rows[0]);
                res(habit)
            } catch (err) {
                rej(`Error creating habit: ${err}`)
            }
        })
    }
}