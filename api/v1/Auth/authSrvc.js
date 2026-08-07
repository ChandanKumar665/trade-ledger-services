/**
 * @file AppService
 * This file has model function.
 */

const status = require('../../../https_status');
const { validateInputs, normalizePhone } = require('../../../utils');
const User = require('../../../services/User');
const jwt = require('jsonwebtoken');
const firebaseAuth = require('../../../config/firebaseAdmin')

class AuthSrvc {
  async login(req, res, callback) {
    const { phone, fbtoken } = req.body
    try {
      let response = {
        message: `User Found`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const requiredInputs = {
        phone,
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
      const decoded = await firebaseAuth.verifyIdToken(fbtoken);
      const fbphn = decoded.phone_number;
      const user = new User();
      const result = await user.search({ phone: normalizePhone(phone) });
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
        statusCode: status.HTTPS.UNAUTHORIZED
      })
    }
  }
  async checkMe(req, res, callback) {
    try {
      let response = {
        message: `User Found`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }
      callback({ ...response, data: req.user })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: status.HTTPS.UNKNOWN_ERROR
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
      const result = await user.create({ name, phone: normalizePhone(phone), email, trading_exp });
      if (!result.success) {
        return callback({
          message: result.msg,
          success: false,
          statusCode: result.statusCode
        })
      }
      //create jwt token
      const token = await result.data.getJWTToken();
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
      });
      callback({ ...response, data: result.data })
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
