const Sequelize = require('sequelize');
const sequelize = require('../db');
// const Workout = require('./workout');
const Exercise = require('./exercise');

const Actual = sequelize.define('actual', {
        setNum: {
            type: Sequelize.INTEGER
        },
        actualReps: {
            type: Sequelize.INTEGER
        },
        actualWgt: {
            type: Sequelize.INTEGER
        },
        // exerciseId: {
        //     type: Sequelize.INTEGER
        // }
    }, {
        freezeTableName: true,
    }
);

Actual.belongsTo(Exercise);

module.exports = Actual;