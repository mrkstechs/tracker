const { Client } = require("pg");

const db = new Client({
    connectionString: process.env.DATABASE_URL,
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    ssl: true
})

db.connect(err => err ? console.error('connection error!', err.stack) : console.log('postgres db conntected!'))

module.exports = {db};