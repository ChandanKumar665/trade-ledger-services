const router = require('express').Router()
const AuthCtrl = require('./authCtrl')

//routes
router.post('/login', new AuthCtrl().login)
router.post('/signup', new AuthCtrl().signup)
router.post('/logout', new AuthCtrl().logout)


// router.post('/test', new AuthCtrl().authProfile)
// router.post('/get-cookie', new AuthCtrl().getCookie)

module.exports = router
