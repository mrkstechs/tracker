const db = require('../db_config/config');

class User {
    constructor(data){
        this.email = data.email
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.username = data.username
        this.password = data.password
    }

    static create({ email, firstName, lastName, username, password}){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO users (email, firstName, lastName, username, password)
                                                VALUES (${email}, ${firstName}, ${lastName}, ${username}, ${password}) RETURNING *;`);
                let user = new User(result.rows[0]);
                res(user)
            } catch (err) {
                rej(`Error creating user: ${err}`)
            }
        })
    }
}