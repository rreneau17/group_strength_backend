const Sequelize = require('sequelize');
const sequelize = require('../db');
// const Actual = require('./actual');
// const Routine_exercise = require('./routine_exercise');

const Exercise = sequelize.define('exercise', {
        exerciseName: {
            type: Sequelize.STRING
        },
        picPath: {
            type: Sequelize.STRING
        },
        videoPath: {
            type: Sequelize.STRING
        },
        instructions: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
    }
);

// Exercise.hasMany(Routine_exercise);
// Exercise.hasMany(Actual);

module.exports = Exercise;