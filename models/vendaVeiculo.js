const Sequelize = require('sequelize');
const database = require('../db');
const Veiculo = require('./veiculo');
const Venda = require('./venda');

const VendaVeiculo = database.define('vendaVeiculo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      }
});

Venda.belongsToMany(Veiculo, { through: VendaVeiculo });
Veiculo.belongsToMany(Venda, { through: VendaVeiculo });


module.exports = VendaVeiculo;