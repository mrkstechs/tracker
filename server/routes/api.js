const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

const userController = require('../controllers/users')
const habitController = require('../controllers/habits')
const trackerController = require('../controllers/trackers')
const goalController = require('../controllers/goals')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/habits', habitController.newHabit)
router.post('/trackers', trackerController.newTracker)
router.post('/goals', goalController.newGoal)

router.get('/users', userController.index)
router.get('/habits', habitController.index)

router.get('/trackers', trackerController.index)
router.get('/trackers/:userid', trackerController.findByUserId)
router.get('/trackers/:userid/:habitid', trackerController.findByUserAndHabit)

router.get('/goals', goalController.index)

module.exports = router