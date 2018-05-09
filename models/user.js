var Sequelize = require('sequelize');
var sequelize = require('../db');

// var Routine = require('./routine');
var Workout = require('./workout');

var User = sequelize.define('user', {
        email: {
            type: Sequelize.STRING
        }, 
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        displayName: {
            type: Sequelize.STRING
        },
        certPT: {
            type: Sequelize.BOOLEAN
        },
        photoUrl: {
            type: Sequelize.STRING
        },
        fbId: {
            type: Sequelize.BIGINT
        },
        googleId: {
            type: Sequelize.BIGINT
        }
    }, {
        freezeTableName: true
    }
);

// User.belongsToMany(Routine, {through: 'User_routine'});
// Routine.belongsToMany(User, {through: 'User_routine'});
User.hasMany(Workout);

module.exports = User;


