const { Pool } = require("pg");
const knex  = require('knex')

const config = require('../../knexfile')

const dbConnect = knex(config.production)

const db = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = {db, dbConnect};