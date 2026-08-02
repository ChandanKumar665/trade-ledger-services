/**
 * @file AppService
 * This file has model function.
 */

const status = require('../../../https_status');
const { validateInputs } = require('../../../utils');
const User = require('../../../services/User');
const jwt = require('jsonwebtoken');

class AuthSrvc {
  async login(req, res, callback) {
    const { phone } = req.body
    let statusCode = ''
    try {
      let response = {
        message: `User Found`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const requiredInputs = {
        phone
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

      const user = new User();
      const result = await user.search({ phone });
      if (!result?._id) {
        return callback({
          message: `User not found`,
          success: false,
          statusCode: status.HTTPS.NOT_FOUND
        })
      }
      //create jwt token
      const token = await result.getJWTToken();
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
      });
      callback({ ...response, data: { token } })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
  async signup(req, res, callback) {
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
  async logout(req, res, callback) {
    let statusCode = ''
    try {
      let response = {
        message: `Logged out successfully`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      callback({ ...response, data: response })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }

}
module.exports = AuthSrvc
