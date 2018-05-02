const Sequelize = require('sequelize');
const sequelize = new Sequelize('groupStrength-DB', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres'
});

module.exports = sequelize;