const Sequelize = require('sequelize');
const database = require('../db');

const Login = database.define('login', {
    id_login: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});

module.exports = Login;