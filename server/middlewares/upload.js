const multer = require('multer')
//เวลารับไฟล์มา ไม่ต้องเซฟลงฮาร์ดดิสก์ ให้เก็บไว้ใน RAM
const storage = multer.memoryStorage()
// เวลามีไฟล์เข้ามา ใช้ memoryStorage()
const upload = multer({
    storage
})
//นำออกไปใช้
module.exports = upload