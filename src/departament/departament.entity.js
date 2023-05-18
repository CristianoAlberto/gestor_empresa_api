const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const departamentEntity = sequelize.define('departament', {
    departamentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    acronym: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

departamentEntity.sync()

module.exports = departamentEntity