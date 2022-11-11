const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const userController = require('./controllers/users')

server.post('/login', userController.login);
server.post('/register', userController.register);

server.get('/users', userController.index)

server.get('/', (req, res) => res.send('Accessing HabitHelper backend'));

module.exports = server;