const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

const userController = require('../controllers/users')
const habitController = require('../controllers/habits')

router.post('/login', userController.login)
router.post('/register', userController.register)

router.post('/habits', habitController.logData)

router.get('/users', userController.index)

module.exports = router