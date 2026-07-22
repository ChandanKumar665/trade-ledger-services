const UserSrvc = require('./userSrvc')

class UserCtrl {
  create(req, res, next) {
    new UserSrvc().create(
      req,
      res,
      data => {
        const statusCode = data.statusCode
        res.status(statusCode).json(data)
      },
      next
    )
  }
  profile(req, res, next) {
    new UserSrvc().profile(
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
    new UserSrvc().update(
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

module.exports = UserCtrl
