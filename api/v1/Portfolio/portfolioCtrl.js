const AccountSrvc = require('./portfolioSrvc')

class AccountCtrl {

  //new route
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
  getAccountList(req, res, next) {
    new AccountSrvc().getAccountList(
      req,
      res,
      data => {
        const statusCode = data.statusCode
        res.status(statusCode).json(data)
      },
      next
    )
  }
  update(req, res, next) {
    new AccountSrvc().update(
      req,
      res,
      data => {
        const statusCode = data.statusCode
        res.status(statusCode).json(data)
      },
      next
    )
  }
  info(req, res, next) {
    new AccountSrvc().info(
      req,
      res,
      data => {
        const statusCode = data.statusCode
        res.status(statusCode).json(data)
      },
      next
    )
  }
  remove(req, res, next) {
    new AccountSrvc().remove(
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
