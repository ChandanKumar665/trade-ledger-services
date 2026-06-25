const AuthSrvc = require('./authSrvc')

class AuthCtrl {
  auth(req, res, next) {
    new AuthSrvc().auth(
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
