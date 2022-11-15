const {db} = require('../db/init');

module.exports = class Goals {
    constructor(data){
        this.id = data.id
        this.userId = data.user_id
        this.habitId = data.habit_id
        this.dailyGoal = data.daily_goal
        this.weeklyGoal = data.weekly_goal
        this.goalUnits = data.goal_units
    }

    static create ({userId, habitId, dailyGoal, weeklyGoal, goalUnits}){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO goals (user_id, habit_id, daily_goal, weekly_goal, goal_units)
                                                VALUES ($1, $2, $3) RETURNING *;`,[userId, habitId, dailyGoal, weeklyGoal, goalUnits]);
                let newGoal = new Goals(result.rows[0]);
                res(newGoal)
            } catch (err) {
                rej(`Error creating goal: ${err}`)
            }
        })
    }

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let result = await db.query('SELECT * FROM goals');
                let goals = result.rows.map(g => new Goals(g));
                resolve (goals);
            } catch (err) {
                reject('Goals not found');
            }
        });
    };
}