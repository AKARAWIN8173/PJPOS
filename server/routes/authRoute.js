const express = require('express')
const router = express.Router()
//ดึว controller
const { register,login,currentUser } = require('../controllers/authController')
//ดึง middleware authenticate.js
const { authenticate,adminOnly,userEnabled } = require('../middlewares/authenticate')

router.post('/register', register)
router.post('/login', login)


// route ทดลอง
router.post('/current-user', authenticate, currentUser)

module.exports = router