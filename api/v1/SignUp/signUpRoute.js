const router = require('express').Router()
const SignUpCtrl = require('./signUpCtrl')

//routes
router.post('', new SignUpCtrl().create)

module.exports = router
