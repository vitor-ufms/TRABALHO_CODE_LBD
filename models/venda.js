const Sequelize = require('sequelize');
const database = require('../db');
const Cliente = require('./cliente');
const Funcionario = require('./funcionario');

const Venda = database.define('venda', {
    id_venda: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    metodo_pagamento: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    valor: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    comissão: {
        type: Sequelize.DECIMAL
    },
    status: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    data: {
        type: Sequelize.DATE
    }
});

Venda.belongsTo(Cliente,{
    constraint: true,
    foreignKey: 'idCliente'
}) 

Venda.belongsTo(Funcionario,{
    constraint: true,
    foreignKey: 'idFuncionario'
})  

module.exports = Venda;