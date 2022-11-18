const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

const userController = require('../controllers/users')

router.post('/login', userController.login)
router.post('/register', userController.register)

router.get('/', userController.index)

module.exports = router
