const {db} = require('../db/init');

module.exports = class Habit {
    constructor(data){
        this.id = data.id
        this.habit = data.habit
        this.recommended_daily_goal = data.recommended_daily_goal
        this.recommended_weekly_goal = data.recommended_weekly_goal
    }

    static create ({habit, recommended_daily_goal, recommended_weekly_goal}){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO habits (habit, recommended_daily_goal, recommended_weekly_goal)
                                                VALUES ($1, $2, $3) RETURNING *;`,[habit, recommended_daily_goal, recommended_weekly_goal]);
                let newHabit = new Habit(result.rows[0]);
                res(newHabit)
            } catch (err) {
                rej(`Error creating habit: ${err}`)
            }
        })
    }

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let result = await db.query('SELECT * FROM habits');
                let habits = result.rows.map(u => new Habit(u));
                resolve (habits);
            } catch (err) {
                reject('Habits not found');
            }
        });
    };
}