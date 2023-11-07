const Sequelize = require('sequelize');
const database = require('../db');

const Fabricante = database.define('fabricante', {
    id_fabricante: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    cnpj: {
        type: Sequelize.STRING(14),
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING(11),
        allowNull: false
    },
    razao_social: {
        type: Sequelize.STRING(100)
    }
});

module.exports = Fabricante;