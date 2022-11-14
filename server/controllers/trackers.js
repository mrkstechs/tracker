const Tracker = require('../models/habit');

async function index (req, res) {
    try {
        const trackers = await Tracker.all;
        res.status(200).json(trackers)
    } catch (err) {
        res.status(500).json({err})
    }
}


module.exports = {index}