const router = require('express').Router()
const SignUpCtrl = require('./signUpCtrl')

//routes
router.post('/signup', new SignUpCtrl().create)
router.post('/search', new SignUpCtrl().details)
// router.post('/ab?c', new SignUpCtrl().details) // will work for both /ab or abc - regex
module.exports = router
