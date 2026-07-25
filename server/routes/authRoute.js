const express = require('express')
const router = express.Router()
const { register,login,currentUser } = require('../controllers/authController')
const authenticate = require('../middlewares/authenticate')

router.post('/register', register)
router.post('/login', login)

// route ทดลอง
router.get('/current-user', authenticate, currentUser)

module.exports = router