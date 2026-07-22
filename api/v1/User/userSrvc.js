/**
 * @file AppService
 * This file has model function.
 */

const status = require('../../../https_status')
const { validateInputs } = require('../../../utils')
const User = require('../../../services/User')

class UserSrvc {
  async create(req, res, callback) {
    const { name, phone, email, trading_exp } = req.body
    let statusCode = ''
    try {
      let response = {
        message: `User created successfully`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const requiredInputs = {
        name, phone
      }
      const { success, key } = await validateInputs(requiredInputs)
      if (!success) {
        return callback({
          message: `Invalid or missing input: ${key}`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      } else if (isNaN(phone)) {
        return callback({
          message: `Invalid input: ${phone}`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      }

      const user = new User()
      const res = await user.create({ name, phone, email, trading_exp })
      if (!res.success) {
        return callback({
          message: res.msg,
          success: false,
          statusCode: res.statusCode
        })
      }
      callback({ ...response, ...res })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
  async profile(req, res, callback) {
    const { user_id } = req.body
    let statusCode = ''
    try {
      let response = {
        message: `ok`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const requiredInputs = {
        user_id
      }
      const { success, key } = await validateInputs(requiredInputs)
      if (!success) {
        return callback({
          message: `Invalid or missing input: ${key}`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      }

      const user = new User()
      const res = await user.profile({ user_id })
      if (!res._id) {
        throw Error('DB Error')
      }
      callback({ ...response, data: res })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
  async update(req, res, callback) {
    const { user_id, trading_exp, email, bio, name } = req.body
    let statusCode = ''
    try {
      let response = {
        message: `Profile updated successfully`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const requiredInputs = {
        user_id
      }
      const { success, key } = await validateInputs(requiredInputs)
      if (!success) {
        return callback({
          message: `Invalid or missing input: ${key}`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      }

      const user = new User()
      const res = await user.update({ user_id, trading_exp, email, bio, name })
      if (!res._id) {
        throw Error('DB Error')
      }
      callback({ ...response, data: res })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
}
module.exports = UserSrvc
