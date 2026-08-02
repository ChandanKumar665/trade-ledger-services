/**
 * @file AppService
 * This file has model function.
 */

const status = require('../../../https_status')
const { validateInputs } = require('../../../utils')
const Account = require('../../../services/Account')
const AppError = require('../../../utils/AppError')

class AccountSrvc {
  async create(req, res, callback) {
    const { name, curr, initial_cap } = req.body
    try {
      let response = {
        message: `Account created successfully`,
        success: true,
        statusCode: status.HTTPS.CREATED
      }

      const requiredInputs = {
        name, curr, initial_cap
      }
      const { success, key } = await validateInputs(requiredInputs)
      if (!success) {
        return callback({
          message: `Invalid or missing input: ${key}`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      } else if (isNaN(initial_cap)) {
        return callback({
          message: `Invalid input: ${phone}`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      }

      const account = new Account()
      const res = await account.create({ ...requiredInputs, user_id: req.user._id.toString() })
      if (!res._id) {
        throw new AppError('DB Error', status.HTTPS.DB_ERROR)
      }
      callback({ ...response, data: res._id })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
  async getAccountList(req, res, callback) {
    try {
      let response = {
        message: `Account list fetched successfully`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const account = new Account()
      const res = await account.getList({ user_id: req.user._id.toString() })
      callback({ ...response, data: res })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
  async update(req, res, callback) {
    const account_id = req.params.acc_id
    const { name, curr, initial_cap } = req.body
    let statusCode = ''
    try {
      let response = {
        message: `Account updated successfully`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const requiredInputs = {
        name, curr, initial_cap, account_id
      }
      const { success, key } = await validateInputs(requiredInputs)
      if (!success) {
        return callback({
          message: `Invalid or missing input: ${key}`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      } else if (isNaN(initial_cap)) {
        return callback({
          message: `Invalid input: ${initial_cap}`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      }

      const account = new Account()
      const res = await account.update({ ...requiredInputs, user_id: req.user._id.toString() })
      if (!res?._id) {
        throw new AppError('DB Error', status.HTTPS.DB_ERROR)
      }
      callback({ ...response, data: res._id })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: error.statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
  async info(req, res, callback) {
    const account_id = req.params.acc_id
    try {
      let response = {
        message: `Account info`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const account = new Account()
      const res = await account.info({ user_id: req.user._id.toString(), account_id })
      if (!res._id) {
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
  async remove(req, res, callback) {
    const account_id = req.params.acc_id

    let statusCode = ''
    try {
      let response = {
        message: `Account deleted successfully`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const requiredInputs = {
        account_id
      }
      const { success, key } = await validateInputs(requiredInputs)
      if (!success) {
        return callback({
          message: `Invalid or missing input: ${key}`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      }

      const account = new Account()
      const res = await account.remove({ ...requiredInputs, user_id: req.user._id.toString() })
      if (!res?._id) {
        throw new AppError('DB Error', status.HTTPS.DB_ERROR)
      }
      callback({ ...response, data: res._id })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
}
module.exports = AccountSrvc
