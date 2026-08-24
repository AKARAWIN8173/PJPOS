const express = require('express')
const router = express.Router()
const { authenticate,adminOnly } = require('../middlewares/authenticate')
const upload = require('../middlewares/upload')
const { list,search,update,updatebyuser,remove,enableduser } = require('../controllers/user')

router.get('/user', authenticate,adminOnly, list)
router.get('/user/search',authenticate,adminOnly, search)
router.patch('/user/me',authenticate,upload.single("image"), updatebyuser)
router.patch('/user/:id',authenticate,adminOnly,upload.single("image"), update)
router.delete('/user/:id',authenticate,adminOnly, remove)
router.patch('/userenabled/:id/',authenticate,adminOnly,enableduser)

module.exports = router