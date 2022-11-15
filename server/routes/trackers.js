const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

const trackerController = require('../controllers/trackers')

router.get('/', trackerController.index)
router.get('/:userid', trackerController.findByUserId)
router.get('/:userid/:habitid', trackerController.findByUserAndHabit)

router.post('/', trackerController.newTracker)

module.exports = router