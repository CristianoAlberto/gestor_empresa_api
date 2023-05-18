const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const positionEntity = sequelize.define('position', {
    positionId: {
        type: DataTypes.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    base_salary: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    subsidy: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    net_salary: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
})

positionEntity.sync()

module.exports = positionEntity