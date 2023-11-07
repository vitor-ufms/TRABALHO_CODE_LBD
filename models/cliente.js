const Sequelize = require('sequelize');
const database = require('../db');

const Cliente = database.define('cliente', {
    id_cliente: {
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
        type: Sequelize.STRING(200),
    },
    telefone: {
        type: Sequelize.STRING(11),
    },
    data_nasc: {
        type: Sequelize.DATE
    },
    sexo: {
        type: Sequelize.CHAR(1),
        allowNull: false
    }

});

module.exports = Cliente;