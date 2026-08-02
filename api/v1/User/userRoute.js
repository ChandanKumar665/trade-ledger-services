const router = require('express').Router()
const { auth } = require('../../../middlewares/auth')
const UserCtrl = require('./userCtrl')

//routes
router.get('/profile', auth, new UserCtrl().profile)
router.put('/update', auth, new UserCtrl().update)

// router.post('/ab?c', new SignUpCtrl().details) // will work for both /ab or abc - regex
module.exports = router
