const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

const goalController = require('../controllers/goals')

router.post('/', goalController.newGoal)

router.get('/', goalController.index)
router.get('/:userid', goalController.findByUserId)
router.get('/:userid/:habitid', goalController.findByUserAndHabit)

module.exports = router