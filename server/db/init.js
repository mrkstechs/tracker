const { Client } = require("pg");

const db = new Client({
    connectionString: 'postgres://fnzorbgwbnijwh:2b288c3af4c52614d1fc2eb35368543628cfe6819c61091f153a6c5a4129ca9a@ec2-54-228-218-84.eu-west-1.compute.amazonaws.com:5432/d23rs2o3k32p1f',
})
db.connect(err => err ? console.error('connection error!', err.stack) : console.log('postgres db conntected!'))

module.exports = {db};