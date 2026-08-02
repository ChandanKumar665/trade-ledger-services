const router = require('express').Router()
const { auth } = require('../../../middlewares/auth')
const AccountCtrl = require('./portfolioCtrl')

// routes
router.post('', auth, new AccountCtrl().create)
router.get('/list', auth, new AccountCtrl().getAccountList)
router.get('/:acc_id', auth, new AccountCtrl().info)
router.put('/:acc_id', auth, new AccountCtrl().update)
router.delete('/:acc_id', auth, new AccountCtrl().remove)


// router.post('/ab?c', new SignUpCtrl().details) // will work for both /ab or abc - regex
module.exports = router
