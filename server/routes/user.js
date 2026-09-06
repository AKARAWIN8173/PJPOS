const express = require('express')
const router = express.Router()
const { authenticate,adminOnly } = require('../middlewares/authenticate')
const upload = require('../middlewares/upload')
const { list,search,update,updatebyuser,remove,enableduser } = require('../controllers/user')
 
//route แสดงรายการ user ทั้งหมด เฉพาะ admin
router.get('/user', authenticate,adminOnly, list)

//route ค้นหาผ่านการพิมพ์
router.get('/user/search',authenticate,adminOnly, search)

//route updateuser ด้วยตัว userเอง
router.patch('/user/me',authenticate,upload.single("image"), updatebyuser)

//route update user ด้วยตัว admin
router.patch('/user/:id',authenticate,adminOnly,upload.single("image"), update)

//route ลบผู้ใช้ เฉพาะ admin
router.delete('/user/:id',authenticate,adminOnly, remove)

//route เปิดปิด ผ้ใช้เฉพาะ admin
router.patch('/userenabled/:id/',authenticate,adminOnly,enableduser)

module.exports = router