const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

const habitController = require('../controllers/habits')

router.post('/habit', habitController.newHabit)

router.get('/habit', habitController.index)

module.exports = router