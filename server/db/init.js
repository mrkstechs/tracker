const { Pool } = require("pg");
const knex  = require('knex')

const config = require('../../knexfile')

const dbConnect = knex(config.production)

const db = new Pool();

module.exports = {db, dbConnect};