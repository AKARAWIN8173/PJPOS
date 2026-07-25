const { DataTypes } = require('sequelize')
const sequelize = require('../config/connectDB')

const Category = sequelize.define('Category', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    //FK
    storeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    categoryname: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            len: [3, 30]
        }
    },

},
    {
        timestamps: true
    })

module.exports = Category