/**
 * @file AppService
 * This file has model function.
 */

const status = require('../../../https_status')
const { validateInputs } = require('../../../utils')

class SignUpSrvc {
  async create(req, res, callback) {
    const { name, phone, trading_exp } = req.body
    let statusCode = ''
    try {
      let response = {
        message: `ok`,
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


      callback({ ...response, data: 'ok' })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
}
module.exports = SignUpSrvc
