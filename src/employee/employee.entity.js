const { DataTypes } = require('sequelize')
const sequelize = require('../../database')

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
    position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: position,
            key: 'id',
        },
    },
    departament: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: departament,
            key: 'id',
        },
    },



})

employeeEntity.belongsTo(Department, {
    foreignKey: 'departamentId',
    allowNull: false,
});

employeeEntity.belongsTo(Positon, {
    foreignKey: 'positionId',
    allowNull: false,
});

employeeEntity.sync()

module.exports = employeeEntity