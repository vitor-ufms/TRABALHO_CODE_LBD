const Sequelize = require('sequelize');
const database = require('../db');
const Modelo = require('./modelo');

const Veiculo = database.define('veiculo', {
    id_veiculo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ano_fabricacao: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valor: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    cor: {
        type: Sequelize.STRING(20)
    }
});

Veiculo.belongsTo(Modelo, {
    constraint: true,
    foreignKey: 'idModelo'
});

module.exports = Veiculo;