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
router.get('/stores', list)
router.patch('/stores/:id', update)
router.delete('/stores/:id', remove)

//นำออกไปใช้
module.exports = router