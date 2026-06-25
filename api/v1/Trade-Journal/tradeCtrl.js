const TradeSrvc = require('./tradeSrvc')

class TradeCtrl {
  create(req, res, next) {
    new TradeSrvc().create(
      req,
      res,
      data => {
        const statusCode = data.statusCode
        res.status(statusCode).json(data)
      },
      next
    )
  }
  details(req, res, next) {
    new TradeSrvc().details(
      req,
      res,
      data => {
        const statusCode = data.statusCode
        res.status(statusCode).json(data)
      },
      next
    )
  }
  getList(req, res, next) {
    new TradeSrvc().getList(
      req,
      res,
      data => {
        const statusCode = data.statusCode
        res.status(statusCode).json(data)
      },
      next
    )
  }
}

module.exports = TradeCtrl
