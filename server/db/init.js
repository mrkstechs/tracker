const { Client } = require("pg");

const db = new Client({
    connectionString: process.env.DATABASE_URL
}).connect();

module.exports = {db};