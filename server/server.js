const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const loginRoutes = require('./routes/login');

server.use('/login', loginRoutes);

server.get('/', (req, res) => res.send('Accessing HabitHelper backend'));
