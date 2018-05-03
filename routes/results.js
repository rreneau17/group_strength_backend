var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../db');
const Op = Sequelize.Op;

const Workout = require('../models/workout');
const Actual = require('../models/actual');
const Routine = require('../models/routine');
// const Routine_exercise = require('../models/routine_exercise');
const Exercise = require('../models/exercise');
const User = require('../models/user');

// provides workout data for a user on the past 28 days 
router.get('/', (req, res) => {
    var d = new Date();
    // set date to 28 days ago
    d.setDate(d.getDate() - 28);
    User.findAll({
        where: {
            id: 2
        },
        include: [{
            model: Workout,
            where: {date: {[Op.gt]: d}},
            include: [{
                model: Routine
            }],
            include: [{
                model: Actual,
                include: [{
                    model: Exercise,
                    attributes: ['exerciseName']
                }]
            }]
        }]
        }).then(results => {
            res.json(results);
        })   
});

module.exports = router;
