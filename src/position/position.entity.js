const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const positionEntity = sequelize.define('position', {
    positionId: {
        type: DataTypes.INTEGER,
        required: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        required: true,
    },
    base_salary: {
        type: DataTypes.FLOAT,
        required: true,
    },
    subsidy: {
        type: DataTypes.FLOAT,
        required: false
    },
    net_salary: {
        type: DataTypes.FLOAT,
        required: true
    },
})

positionEntity.sync()

module.exports = positionEntity