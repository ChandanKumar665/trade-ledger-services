const router = require('express').Router()
const UserCtrl = require('./userCtrl')

//routes
router.post('/signup', new UserCtrl().create)
router.post('/profile', new UserCtrl().profile)
router.post('/update', new UserCtrl().update)

// router.post('/ab?c', new SignUpCtrl().details) // will work for both /ab or abc - regex
module.exports = router
