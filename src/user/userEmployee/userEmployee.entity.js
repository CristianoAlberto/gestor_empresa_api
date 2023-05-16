const { DataTypes } = require('sequelize')
const sequelize = require('../../database')

const userEmployee = sequelize.define('UserEmployee', {
    idUserEmployee: {
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
    office: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departament: {
        type: DataTypes.STRING,
        allowNull: false,
        // references: {
        //     model: departament,
        //     key: 'id',
        // },
    },



})

// User.belongsTo(Department, {
//     foreignKey: 'departamentId',
//     allowNull: false,
//   });
userEmployee.sync()

module.exports = userEmployee