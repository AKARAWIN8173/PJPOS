const { DataTypes } = require('sequelize')
const sequelize = require('../config/connectDB')

const StockLog = sequelize.define('StockLog',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    storeId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

    productId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

    type:{
        type:DataTypes.ENUM(
            'SALE',
            'PURCHASE',
            'RETURN',
            'ADJUST'
        ),
        allowNull:false
    },

    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },

    note:{
        type:DataTypes.STRING(255)
    }

},{
    timestamps:true
})

module.exports = StockLog