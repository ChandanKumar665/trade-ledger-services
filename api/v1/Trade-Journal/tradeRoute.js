const router = require('express').Router()
const TradeCtrl = require('./tradeCtrl')

//routes
router.post('', new TradeCtrl().create)
router.post('/info', new TradeCtrl().details)
router.post('/list', new TradeCtrl().getList)
// router.post('/ab?c', new SignUpCtrl().details) // will work for both /ab or abc - regex
module.exports = router
