const { DataTypes } = require('sequelize')
const sequelize = require('../config/connectDB')

const User = sequelize.define('User', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        },
    },

    username: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
        validate: {
            len: [4, 30],
        },
    },

    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 100]
        },
    },

    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },

    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    image: {
        type: DataTypes.STRING,
    },
    
    imagePublicId: {
    type: DataTypes.STRING,
    allowNull: true
}


}, {
    timestamps: true
})

module.exports = User