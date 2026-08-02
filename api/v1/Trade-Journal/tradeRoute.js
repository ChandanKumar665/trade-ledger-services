const router = require('express').Router()
const { auth } = require('../../../middlewares/auth')
const TradeCtrl = require('./tradeCtrl')

//routes
router.post('', auth, new TradeCtrl().create)
router.get('/:trade_id', auth, new TradeCtrl().details)
router.post('/list', auth, new TradeCtrl().getList)
router.delete('/:trade_id', auth, new TradeCtrl().deleteTrade)
router.put('/:trade_id', auth, new TradeCtrl().updateTrade)
router.post('/stats', auth, new TradeCtrl().tradeStats)

// router.post('/ab?c', new SignUpCtrl().details) // will work for both /ab or abc - regex
module.exports = router
