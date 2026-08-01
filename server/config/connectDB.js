// เรียกใช้ sequelize
const { Sequelize } = require('sequelize');

// สร้างการเชื่อมต่อกับ mysql โดยดึงค่าจาก process.env
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

// export ออกไปใช้
module.exports = sequelize;