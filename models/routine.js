const Sequelize = require('sequelize');
const sequelize = require('../db');
// const Workout = require('./workout');
const User = require('./user');

const Routine = sequelize.define('routine', {
        routineName: {
            type: Sequelize.STRING
        },
        routineURL: {
            type: Sequelize.STRING
        },
        routinePic: {
            type: Sequelize.STRING
        },
        authorId: {
            type: Sequelize.INTEGER,
            references: {
                model: User,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE 
            }
        }
    }, {
        freezeTableName: true,
    }
);

// Routine.hasMany(Workout);
// Routine.belongsToMany(User, {through: 'User_routine'});
// Routine.belongsTo(User_routine, {foreignKey: 'authorId', targetKey: 'userId'});

module.exports = Routine;