const SignUpSrvc = require('./signUpSrvc')

class SignUpCtrl {
  create(req, res, next) {
    new SignUpSrvc().create(
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

module.exports = SignUpCtrl
