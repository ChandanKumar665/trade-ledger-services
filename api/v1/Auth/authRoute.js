const router = require('express').Router()
const { auth } = require('../../../middlewares/auth')
const AuthCtrl = require('./authCtrl')

//routes
router.post('/login', new AuthCtrl().login)
router.get('/me', auth, new AuthCtrl().checkMe)
router.get('/health-check', (req, res) => {
    res.status(200).json({
        message: `OK`,
        success: true,
        statusCode: 200
    })
})
router.post('/signup', new AuthCtrl().signup)
router.post('/logout', new AuthCtrl().logout)


module.exports = router
