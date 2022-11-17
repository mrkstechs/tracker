const { Client } = require("pg");

const db = new Client({
    connectionString: process.env.DATABASE_URL,
})
db.connect(err => err ? console.error('connection error!', err.stack) : console.log('postgres db conntected!'))

module.exports = {db};