/**
 * @file AppService
 * This file has model function.
 */

const status = require('../../../https_status')
const { validateInputs } = require('../../../utils')
const User = require('../../../services/User')
const AppError = require('../../../utils/AppError')

class UserSrvc {
  async profile(req, res, callback) {
    try {
      let response = {
        message: `ok`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const user = new User()
      const res = await user.profile({ user_id: req.user._id.toString() })
      if (!res._id) {
        throw new AppError('DB Error', status.HTTPS.DB_ERROR)
      }
      callback({ ...response, data: res })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: status?.statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
  async update(req, res, callback) {
    const { trading_exp, email, bio, name } = req.body
    let statusCode = ''
    try {
      let response = {
        message: `Profile updated successfully`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const user = new User()
      const res = await user.update({ user_id: req.user._id.toString(), trading_exp, email, bio, name })
      if (!res?._id) {
        throw new AppError('DB Error', status.HTTPS.DB_ERROR)
      }
      callback({ ...response, data: res })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: error?.statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
}
module.exports = UserSrvc
