var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../db');
const Op = Sequelize.Op;

// const passport = require('passport');
const ensureAuthenticated = require('../auth').ensureAuthenticated;
// const session = require('express-session');
// const cookieparser = require('cookie-parser');

const Workout = require('../models/workout');
const Actual = require('../models/actual');
const Routine = require('../models/routine');
const Routine_exercise = require('../models/routine_exercise');
const Exercise = require('../models/exercise');
const User = require('../models/user');
const User_routine = require('../models/user_routine');

router.all('*', ensureAuthenticated);

// provides workout data for a user on the past 28 days 
router.route('/:userId')
    .get((req, res) => {
        var d = new Date();
        // set date to 28 days ago
        d.setDate(d.getDate() - 28);
        User.findAll({
            where: {
                id: req.param('userId')
            },
            attributes: [],
            include: [{
                model: Routine,
                attributes: ['routineName'],
                through: {
                    where: {
                        active: true
                    },
                    attributes: [],
                },
            }],
            include: [{
                model: Workout,
                attributes: ['date'],
                where: {date: {[Op.gt]: d}},
                include: [{
                    model: Actual,
                    attributes: ['setNum', 'actualReps', 'actualWgt', 'exerciseId', 'workoutId'],
                    include: [{
                        model: Exercise,
                        attributes: ['exerciseName']
                    }]
                }]
            }]
            }).then(results => {
                res.json(results);
            })   
        // Workout.findAll({
        //     where: {
        //         date: {[Op.gt]: d}
        //     },
        //     include: [{
        //         model: User_routine,
        //         where: {
        //             userId: 1
        //         }
        //         // attributes: ['routineId']
        //     }]
        // }).then(results => {

        //         Routine.findAll({
        //             attributes: ['id', 'routineName'],
        //             include: [{
        //                 model: User,
        //                 where: {
        //                     id: 1
        //                 },
        //                 attributes: [],
        //                 through: {
        //                     attributes: []
        //                 }
        //             }]
        //         }).then(routines => {
        //             // res.json(routines);
        //             let rtName;
        //             let newResults = results.map((result, i) => {
        //                 routines.forEach(routine => {
        //                     // console.log(result.user_routine.routineId, routine.id);
        //                     if(result.user_routine.routineId === routine.id) {
        //                         rtName = routine.routineName; 
        //                     }
        //                 })
        //                 return {
        //                     routineName: rtName,
        //                     date: result.date
        //                 }
        //             })
        //             res.json(newResults);
        //     })
        //     // res.json(results);
        // })
    });

module.exports = router;
