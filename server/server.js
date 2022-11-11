const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');

server.use('/login', loginRoute);
server.use('/register', registerRoute);

server.get('/', (req, res) => res.send('Accessing HabitHelper backend'));
