const AuthSrvc = require('./authSrvc')

class AuthCtrl {
  login(req, res, next) {
    new AuthSrvc().login(
      req,
      res,
      data => {
        const statusCode = data.statusCode
        res.status(statusCode).json(data)
      },
      next
    )
  }
  signup(req, res, next) {
    new AuthSrvc().signup(
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

module.exports = AuthCtrl
