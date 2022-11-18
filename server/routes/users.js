const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

const userController = require('../controllers/users')

router.post('/users/login', userController.login)
router.post('/users/register', userController.register)

router.get('/users', userController.index)

module.exports = router