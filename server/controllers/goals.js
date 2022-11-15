const Goal = require('../models/goal');

async function index (req, res) {
    try {
        const goals = await Goal.all;
        res.status(200).json(goals)
    } catch (err) {
        res.status(500).json({err})
    }
}

async function newGoal (req, res) {
    try {
        const newGoal = await Goal.create(req.body)
        res.status(200).json(newGoal)
    } catch (err) {
        res.status(500).json({err})
    }
}

async function findByUserId (req, res) {
    try {
        const goals = await Goal.findByUserId(parseInt(req.params.userid));
        res.status(200).json(goals)
    } catch (err) {
        res.status(500).json({err})
    }
}

async function findByUserAndHabit (req, res) {
    try {
        const goals = await Goal.findByUserAndHabit(parseInt(req.params.userid), parseInt(req.params.habitid));
        res.status(200).json(goals)
    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = {index, newGoal, findByUserId, findByUserAndHabit}