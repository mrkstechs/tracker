const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

const userController = require('../controllers/users')
const habitController = require('../controllers/habits')
const trackerController = require('../controllers/trackers')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/habits', habitController.newHabit)
router.post('/trackers', trackerController.newTracker)

router.get('/users', userController.index)
router.get('/habits', habitController.index)
router.get('/trackers', trackerController.index)
router.get('/trackers/:userid', trackerController.findByUserId)

module.exports = router