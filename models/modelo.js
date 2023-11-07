const Sequelize = require('sequelize');
const database = require('../db');
const Fabricante = require('./fabricante');

const Modelo = database.define('modelo', {
    id_modelo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    versao: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});

Modelo.belongsTo(Fabricante, {
    constraint: true,
    foreignKey: 'id_fabricante'
})

module.exports = Modelo;