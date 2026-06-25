const router = require('express').Router()
const AccountCtrl = require('./portfolioCtrl')

//routes
router.post('', new AccountCtrl().create)
router.post('/list', new AccountCtrl().getList)
// router.post('/ab?c', new SignUpCtrl().details) // will work for both /ab or abc - regex
module.exports = router
