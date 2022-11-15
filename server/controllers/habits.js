const Habit = require('../models/habit');

async function index (req, res) {
    try {
        const habits = await Habit.all;
        res.status(200).json(habits)
    } catch (err) {
        res.status(500).json({err})
    }
}

async function newHabit (req, res) {
    try {
        const newHabit = await Habit.create(req.body)
        res.status(200).json(newHabit)
    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = {index, newHabit}