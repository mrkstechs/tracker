const { Client } = require("pg");

const db = new Client({
    connectionString: process.env.DATABASE_URL,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE
})

db.connect(err => err ? console.error('connection error!', err.stack) : console.log('postgres db conntected!'))

module.exports = {db};