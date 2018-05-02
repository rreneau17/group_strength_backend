const Sequelize = require('sequelize');
const sequelize = require('../db');
const Workout = require('./workout');
// const Routine_exercise = require('./routine_exercise');

const Routine = sequelize.define('routine', {
        routineName: {
            type: Sequelize.STRING
        },
        active: {
            type: Sequelize.BOOLEAN
        },
        routineURL: {
            type: Sequelize.STRING
        },
        routinePic: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
    }
);

Routine.hasMany(Workout);
// Routine.hasMany(Routine_exercise);

module.exports = Routine;