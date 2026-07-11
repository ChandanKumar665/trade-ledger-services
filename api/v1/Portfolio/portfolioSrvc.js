/**
 * @file AppService
 * This file has model function.
 */

const status = require('../../../https_status')
const { validateInputs } = require('../../../utils')
const Account = require('../../../services/Account')

class AccountSrvc {
  async create(req, res, callback) {
    const { name, curr, initial_cap, user_id } = req.body
    let statusCode = ''
    try {
      let response = {
        message: `Account created successfully`,
        success: true,
        statusCode: status.HTTPS.CREATED
      }

      const requiredInputs = {
        name, curr, initial_cap, user_id
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
      const res = await account.create(requiredInputs)
      if (!res._id) {
        throw Error('DB Error')
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
  async getList(req, res, callback) {
    const { user_id } = req.body
    let statusCode = ''
    try {
      let response = {
        message: `Account list fetched successfully`,
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

      const account = new Account()
      const res = await account.getList(requiredInputs)
      callback({ ...response, data: res })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
  async removeAccount(req, res, callback) {
    const { user_id, account_id } = req.body
    let statusCode = ''
    try {
      let response = {
        message: `Account deleted successfully`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const requiredInputs = {
        user_id, account_id
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
      const res = await account.remove(requiredInputs)
      if (!res._id) {
        throw Error('DB Error')
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
  async updateAccount(req, res, callback) {
    const { name, curr, initial_cap, user_id, account_id } = req.body
    let statusCode = ''
    try {
      let response = {
        message: `Account updated successfully`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const requiredInputs = {
        name, curr, initial_cap, user_id, account_id
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
      const res = await account.update(requiredInputs)
      if (!res._id) {
        return Error('DB Error')
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
