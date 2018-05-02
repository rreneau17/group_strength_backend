const express = require('express');
const router = express.Router();

const Sequelize = require('sequelize');
const sequelize = require('../db');

const Exercise = require('../models/exercise');
const Routine = require('../models/routine');
const Routine_exercise = require('../models/routine_exercise');
const Actual = require('../models/actual');
const Workout = require('../models/workout');

// route to provide routine/exercise data to the fitbit device and post actual workout results fromt he device
router.route('/')
    .get((req, res) => {
        // retrieve the active routine and all associated exercise info
        Routine.findAll({
            where: {active: true},
            attributes: ['id', 'routineName'],
            include: [{
                model: Exercise,
                attributes: ['exerciseName'],
                //retrieve fields from join table (routine_results)
                through: {
                    attributes: ['exerciseId', 'orderNum', 'weight', 'reps', 'sets'],
                }
            }],
            // order the exercises by the order in which the exercise is to be performed during the workout
            order: [ [ Exercise, Routine_exercise, 'orderNum' ] ]
        }).then(routines => {
            // preparing routine data for fitbit device
            let exerciseArray = routines[0].exercises.map(exercise => {
                return {
                    exerciseName: exercise.exerciseName,
                    exerciseId: exercise.routine_exercise.exerciseId,
                    orderNum: exercise.routine_exercise.orderNum,
                    weight: exercise.routine_exercise.weight,
                    reps: exercise.routine_exercise.reps,
                    sets: exercise.routine_exercise.sets
                }
            })
            let rtnResults = {
                routineName: routines[0].routineName,
                routineId: routines[0].id,
                exercises: exerciseArray
            }  
            // console.log(rtnResults);
            
            //rendering routine data for fitbit retrieval
            res.json(rtnResults);
        }); 
    })
    // posting actual workout results from the fitbit device
    .post((req, res) => {
        console.log('posting actuals...');
        console.log(req.body);
        Workout.create({
        date: req.body.date,
        routineId: req.body.routineId
        }).then(workout => {
            req.body.actuals.forEach(actual => {
                Actual.create({
                    setNum: actual.setNum,
                    actualReps: actual.actualReps,
                    actualWgt: actual.actualWgt,
                    exerciseId: actual.exerciseId,
                    workoutId: workout.id
                })
            })
            res.send({success: true});
        });
    }) 

module.exports = router;