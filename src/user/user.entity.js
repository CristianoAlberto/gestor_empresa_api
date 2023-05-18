const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const userEntity = sequelize.define('user', {
    userId: {
        type: DataTypes.NUMBER,
        required: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DateTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    password: {
        type: DateTypes.STRING,
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

userEntity.sync()

module.exports = userEntity