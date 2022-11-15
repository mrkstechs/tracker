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

module.exports = {index, newTracker, findByUserId}