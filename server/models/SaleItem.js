const { DataTypes } = require('sequelize')
const sequelize = require('../config/connectDB')

const SaleItem = sequelize.define('SaleItem',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    saleId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

    productId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            min:1
        }
    },

    unitPrice:{
        type:DataTypes.DECIMAL(11,2),
        allowNull:false
    },

    unitCost:{
        type:DataTypes.DECIMAL(11,2),
        allowNull:false
    },

    subtotal:{
        type:DataTypes.DECIMAL(11,2),
        allowNull:false
    }

},{
    timestamps:true
})

module.exports = SaleItem