const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

const habitController = require('../controllers/habits')

router.post('/', habitController.newHabit)

router.get('/', habitController.index)

module.exports = router