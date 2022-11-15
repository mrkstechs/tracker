const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

const goalController = require('../controllers/goals')

router.post('/', goalController.newGoal)

router.get('/', goalController.index)

module.exports = router