const express = require('express')
const router = express.Router()
const { authenticate,userEnabled } = require('../middlewares/authenticate')
const { create,list,update,remove } = require('../controllers/category')

router.post('/stores/:storeId/category',authenticate,create)
router.get('/stores/:storeId/category',authenticate,list)
router.patch('/stores/:storeId/category/:id',authenticate,update)
router.delete('/stores/:storeId/category/:id',authenticate,remove)

module.exports = router