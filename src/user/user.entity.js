const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const userEntity = sequelize.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        required: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

userEntity.sync()

module.exports = userEntity