const Sequelize = require('sequelize');
const sequelize = require('../db');
const Actual = require('./actual');
const Routine = require('./routine');

const Workout = sequelize.define('workout', {
        date: {
            type: Sequelize.DATEONLY
        }
    }, {
        freezeTableName: true,
    }
);

Workout.hasMany(Actual);
// Workout.belongsTo(Routine);

module.exports = Workout;