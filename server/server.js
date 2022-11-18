const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());
server.use(express.json());

const goalsRoute = require('./routes/goals')
const habitsRoute = require('./routes/habits')
const usersRoute = require('./routes/users')
const trackersRoute = require('./routes/trackers')

const port = process.env.PORT || 3000;

server.use('/goals', goalsRoute)
server.use('/habits', habitsRoute)
server.use('/users', usersRoute)
server.use('/trackers', trackersRoute)



server.get('/', (req, res) => res.send('Accessing HabitHelper backend'))

server.listen(port, () => console.log(`Express now departing from port ${port}!`))
