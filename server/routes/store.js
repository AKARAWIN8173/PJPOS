const express = require('express')
const router= express.Router()
//ดึว controller
const { create,update,list,remove } = require('../controllers/store')
//ดึง middleware authenticate.js
const { authenticate,adminOnly,userEnabled } = require('../middlewares/authenticate')
//ดึง middleware upload
const upload = require("../middlewares/upload")

//ตรวจสอบว่า login หรือยังที่ authenticate -> แยก req.body req.file โดย multer -> เข้า fnc create
router.post('/stores',authenticate, upload.single("image"), create)

//route ขอข้อมูลร้านค้าทั้งหมด
router.get('/stores', authenticate, list)

//route อัปเดตร้านค้า
router.patch('/stores/:id',authenticate,upload.single("image"), update)

//route ลบร้านค้า
router.delete('/stores/:id',authenticate, remove)

//นำออกไปใช้
module.exports = router