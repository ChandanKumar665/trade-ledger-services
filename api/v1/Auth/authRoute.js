const router = require('express').Router()
const AuthCtrl = require('./authCtrl')

//routes
router.post('', new AuthCtrl().auth)
module.exports = router
