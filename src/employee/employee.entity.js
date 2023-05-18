const { DataTypes } = require('sequelize')
const sequelize = require('../database')
const Departament = require('../departament/departament.entity')
const Position = require('../position/position.entity')


const employeeEntity = sequelize.define('employee', {
    employeeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    positionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Position,
            key: 'positionId',
        },
    },
    departamentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Departament,
            key: 'departamentId',
        },
    },



})

employeeEntity.belongsTo(Departament, {
    foreignKey: 'departamentId',
    allowNull: false,
});

employeeEntity.belongsTo(Position, {
    foreignKey: 'positionId',
    allowNull: false,
});

employeeEntity.sync()

module.exports = employeeEntity