const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());
server.use(express.json());

const apiRoutes =-  require('./routes/api')

server.use('/api', apiRoutes)

server.get('/', (req, res) => res.send('Accessing HabitHelper backend'));

module.exports = server;