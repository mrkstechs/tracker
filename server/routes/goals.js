const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

const goalController = require('../controllers/goals')

router.post('/goals', goalController.newGoal)

router.get('/goals', goalController.index)
router.get('/goals:userid', goalController.findByUserId)
router.get('/goals:userid/:habitid', goalController.findByUserAndHabit)

module.exports = router