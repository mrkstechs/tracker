const db = require('../db/db_config');

module.exports = class User {
    constructor(data){
        this.id = data.id
        this.email = data.email
        this.firstName = data.firstname
        this.lastName = data.lastname
        this.username = data.username
        this.password = data.password
    }

    static create ({ email, firstName, lastName, username, password}){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO users (email, firstName, lastName, username, password)
                                                VALUES ($1, $2, $3, $4, $5) RETURNING *;`,[email, firstName, lastName, username, password]);
                let user = new User(result.rows[0]);
                res(user)
            } catch (err) {
                rej(`Error creating user: ${err}`)
            }
        })
    }

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let result = await db.query('SELECT * FROM users');
                let users = result.rows.map(u => new User(u));
                resolve (users);
            } catch (err) {
                reject('Users not found');
            }
        });
    };


    static findByUsername (username) {
        return new Promise (async (res, rej) => {
            try {
                let result = await db.query('SELECT * FROM users WHERE username = $1;', [username])
                let user = new User(result.rows[0])
                res(user)
            } catch (err) {
                rej (`Error finding user: ${err}`)
            }
        })
    }

    
}