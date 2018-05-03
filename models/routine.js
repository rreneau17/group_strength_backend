const Sequelize = require('sequelize');
const sequelize = require('../db');
// const Workout = require('./workout');
// const User = require('./user');

const Routine = sequelize.define('routine', {
        routineName: {
            type: Sequelize.STRING
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

// Routine.hasMany(Workout);
// Routine.belongsToMany(User, {through: 'User_routine'});

module.exports = Routine;