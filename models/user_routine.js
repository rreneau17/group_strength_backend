const Sequelize = require('sequelize');
const sequelize = require('../db');
const Routine = require('./routine');
const User = require('./user');
// const Workout = require('./workout');

const User_routine = sequelize.define('user_routine', {
        // forces new primary key
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
        active: {
            type: Sequelize.BOOLEAN
        }
    }, {
        freezeTableName: true,
    }
);

Routine.belongsToMany(User, { through: User_routine });
User.belongsToMany(Routine, { through: User_routine });

// User_routine.hasMany(Workout);

module.exports = User_routine;