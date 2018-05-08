var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../db');
const Op = Sequelize.Op;

const Workout = require('../models/workout');
const Actual = require('../models/actual');
const Routine = require('../models/routine');
const Routine_exercise = require('../models/routine_exercise');
const Exercise = require('../models/exercise');
const User = require('../models/user');
const User_routine = require('../models/user_routine');

// provides workout data for a user on the past 28 days 
router.get('/', (req, res) => {
    var d = new Date();
    // set date to 28 days ago
    d.setDate(d.getDate() - 28);
    // User.findAll({
    //     where: {
    //         id: 2
    //     },
    //     include: [{
    //         model: Workout,
    //         where: {date: {[Op.gt]: d}},
    //         include: [{
    //             model: Routine
    //         }],
    //         include: [{
    //             model: Actual,
    //             include: [{
    //                 model: Exercise,
    //                 attributes: ['exerciseName']
    //             }]
    //         }]
    //     }]
    //     }).then(results => {
    //         res.json(results);
    //     })   
    Workout.findAll({
        where: {
            date: {[Op.gt]: d}
        },
        include: [{
            model: User_routine,
            where: {
                userId: 1
            },
            attributes: ['routineId']
        }],
    }).then(results => {
        Routine.findAll({
            attributes: ['id', 'routineName'],
            include: [{
                model: User,
                where: {
                    id: 1
                },
                attributes: [],
                through: {
                    attributes: []
                }
            }]
        }).then(routines => {
            // res.json(routines);
        })
        res.json(results);
    })
});

module.exports = router;
