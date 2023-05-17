const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const departamentEntity = sequelize.define('departament', {
    departamentId: {
        type: DataTypes.String,
        required: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        required: true
    },
    acronym: {
        type: DataTypes.STRING,
        required: true
    }
})

departamentEntity.sync()

module.exports = departamentEntity