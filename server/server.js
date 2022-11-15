const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());
server.use(express.json());

const userRoutes =  require('./routes/users')
const goalRoutes = require('./routes/hoals')
const trackerRoutes = require('./routes/trackers')
const habitRoutes = require('./routes/habits')

server.use('/users', userRoutes)
server.use('/goals', goalRoutes)
server.use('/trackers', trackerRoutes)
server.use('/habits', habitRoutes)

server.get('/', (req, res) => res.send('Accessing HabitHelper backend'));

module.exports = server;