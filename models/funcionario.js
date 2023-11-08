const Sequelize = require('sequelize');
const database = require('../db');
const Login = require('./login');

const Funcionario = database.define('funcionario', {
    id_funcionario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING(11),
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING(200)
    },
    email: {
        type: Sequelize.STRING(50)
    },
    data_nasc: {
        type: Sequelize.DATE
    },
    sexo: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    salario: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
});

Funcionario.belongsTo(Login, {
    constraint: true,
    foreignKey: 'id_login'
})

module.exports = Funcionario;