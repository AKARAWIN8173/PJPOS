const { DataTypes } = require('sequelize')
const sequelize = require('../config/connectDB')

const Store = sequelize.define('Store', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    storename: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [3, 100]
        },
    },

    image: {
        type: DataTypes.STRING,
    },

    imagePublicId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    //FK
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
    {
        timestamps: true
    })

module.exports = Store