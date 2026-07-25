const { DataTypes } = require('sequelize')
const sequelize = require('../config/connectDB')

const Sale = sequelize.define('Sale', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    storeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    totalAmount: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: false,
        defaultValue: 0
    },

    totalCost: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: false,
        defaultValue: 0
    },

    profit: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: false,
        defaultValue: 0
    },

    paymentMethod: {
        type: DataTypes.ENUM(
            'cash',
            'transfer',
            'qr',
            'credit'
        )
    },

    saleDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

}, {
    timestamps: true
})

module.exports = Sale