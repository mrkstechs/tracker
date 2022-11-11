const {db} = require('./init');
const fs = require('fs');

const seeds = fs.readFileSync(__dirname + '/seed.sql').toString();

db.query(seeds, () => console.log('database seeded'));
