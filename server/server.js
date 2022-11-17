const path = require('path')
const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());
server.use(express.json());

const apiRoutes =  require('./routes/api')
const port = process.env.PORT || 3000;

server.use(express.static(path.resolve('./client/')))
server.use('/api', apiRoutes)


server.get('/', (req, res) => res.send('Accessing HabitHelper backend'))

server.listen(port, () => console.log(`Express now departing from port ${port}!`))

module.exports = server;