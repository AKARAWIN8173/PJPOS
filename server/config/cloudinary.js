//ดึง cloudinary
const cloudinary = require('cloudinary').v2
//ตั้งค่า cloudinary จาก .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
//นำออกไปใช้
module.exports = cloudinary