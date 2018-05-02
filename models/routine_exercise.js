const Sequelize = require('sequelize');
const sequelize = require('../db');
const Routine = require('./routine');
const Exercise = require('./exercise');

const Routine_exercise = sequelize.define('routine_exercise', {
        orderNum: {
            type: Sequelize.INTEGER
        },
        weight: {
            type: Sequelize.INTEGER
        },
        sets: {
            type: Sequelize.INTEGER
        },
        reps: {
            type: Sequelize.INTEGER
        }, 
    }, {
        freezeTableName: true,
    }
);

Routine.belongsToMany(Exercise, { through: Routine_exercise });
Exercise.belongsToMany(Routine, { through: Routine_exercise });

module.exports = Routine_exercise;