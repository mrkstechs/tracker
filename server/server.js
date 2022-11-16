const path = require('path')
const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());
server.use(express.json());

const apiRoutes =  require('./routes/api')

server.use(express.static(path.resolve('./client/')))
server.use('/api', apiRoutes)


server.get('/', (req, res) => res.sendFile(path.resolve('./server/client/index.html')))

module.exports = server;