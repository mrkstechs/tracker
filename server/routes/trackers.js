const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

const trackerController = require('../controllers/trackers')

router.get('/trackers', trackerController.index)
router.get('/trackers:userid', trackerController.findByUserId)
router.get('/trackers:userid/:habitid', trackerController.findByUserAndHabit)

router.post('/trackers', trackerController.newTracker)

router.put('/trackers', trackerController.updateTracker)

module.exports = router