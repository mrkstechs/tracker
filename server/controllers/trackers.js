const Tracker = require('../models/tracker');

async function index (req, res) {
    try {
        const trackers = await Tracker.all;
        res.status(200).json(trackers)
    } catch (err) {
        res.status(500).json({err})
    }
}

async function newTracker (req, res) {
    try {
        const newTracker = await Tracker.create(req.body)
        res.status(200).json(newTracker)
    } catch (err) {
        res.status(500).json({err})
    }
}

async function findByUserId (req, res) {
    try {
        const trackers = await Tracker.findByUserId(parseInt(req.params.userid));
        res.status(200).json(trackers)
    } catch (err) {
        res.status(500).json({err})
    }
}

async function findByUserAndHabit (req, res) {
    try {
        const trackers = await Tracker.findByUserAndHabit(parseInt(req.params.userid), parseInt(req.params.habitid));
        res.status(200).json(trackers)
    } catch (err) {
        res.status(500).json({err})
    }
}

async function updateTracker (req, res) {
    try {
        const tracker = await Tracker.findByUserHabitAndDate(parseInt(req.body.userid), parseInt(req.body.habitid), (req.body.date))
        const updatedTracker = await Tracker.updateDailyValue(tracker.id, req.body.dailyValue)
        res.status(200).json(updatedTracker)
    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = {index, newTracker, findByUserId, findByUserAndHabit, updateTracker}