const AccountSrvc = require('./portfolioSrvc')

class AccountCtrl {
  create(req, res, next) {
    new AccountSrvc().create(
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
    new AccountSrvc().getList(
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

module.exports = AccountCtrl
