const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/concessionaria', {
    host: 'localhost',
    dialect: 'postgres'
}) // user:senha@host:port/database

module.exports = sequelize;