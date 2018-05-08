const Sequelize = require('sequelize');
const sequelize = require('../db');
const Actual = require('./actual');
// const Routine = require('./routine');
User_routine = require('./user_routine');

const Workout = sequelize.define('workout', {
        date: {
            type: Sequelize.DATEONLY
        }
    }, {
        freezeTableName: true,
    }
);

Workout.hasMany(Actual);
Workout.belongsTo(User_routine);


module.exports = Workout;