const express = require('express')
const router = express.Router()

const userController = require('../controllers/users')

router.post('/login', userController.login)
router.post('/register', userController.register)

router.get('/users', userController.index)

module.exports = router