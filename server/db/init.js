const { Client } = require("pg");

const db = new Client({
    connectionString: 'postgres://xwxkepfzogadhh:17e6276c5dd824a3a3c1e1e57ce566c5324993b0f5a8f5cfe571b86fdbdd44a8@ec2-34-252-216-149.eu-west-1.compute.amazonaws.com:5432/db9ccbldikovr1',
})
db.connect(err => err ? console.error('connection error!', err.stack) : console.log('postgres db conntected!'))

module.exports = {db};