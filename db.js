const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:postgres@175.20.0.2:5432/concessionaria', {
    host: '175.20.0.2',
    dialect: 'postgres'
}) // user:senha@host:port/database

module.exports = sequelize;