const { DataTypes } = require('sequelize')
const sequelize = require('../config/connectDB')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    //FK
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //FK
    storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },

    barcode: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },

    costPrice: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },

    salePrice: {
        type: DataTypes.DECIMAL(11, 2),
        allowNull: false,
        validate: {
            min: 0,
        }
    },

    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0,
        },
    },

    image: {
        type: DataTypes.STRING,
    },

    imagePublicId: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        timestamps: true,
    })

module.exports = Product