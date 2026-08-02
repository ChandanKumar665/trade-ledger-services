/**
 * @file AppService
 * This file has model function.
 */

const status = require('../../../https_status')
const { validateInputs } = require('../../../utils')
const Trade = require('../../../services/Trade')
const AppError = require('../../../utils/AppError')

class TradeSrvc {
  async create(req, res, callback) {
    const { symbol,
      order_type,
      desc,
      open_time,
      close_time,
      entry_price,
      exit_price,
      qty,
      pnl,
      charges,
      account_id
    } = req.body
    let statusCode = ''
    try {
      let response = {
        message: `Trade added successfully`,
        success: true,
        statusCode: status.HTTPS.CREATED
      }

      const requiredInputs = {
        symbol,
        order_type,
        open_time,
        close_time,
        entry_price,
        exit_price,
        qty,
        pnl,
        account_id
      }
      const { success, key } = await validateInputs(requiredInputs)
      if (!success) {
        return callback({
          message: `Invalid or missing input: ${key}`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      } else if (isNaN(pnl) || isNaN(qty) || isNaN(entry_price) || isNaN(exit_price)) {
        return callback({
          message: `Invalid input:`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      }

      const trade = new Trade()
      const res = await trade.create({
        symbol,
        order_type,
        desc,
        open_time,
        close_time,
        entry_price,
        exit_price,
        qty,
        pnl,
        charges,
        user_id: req.user._id.toString(),
        account_id
      })
      if (!res._id) {
        throw new AppError('DB Error', status.HTTPS.DB_ERROR)
      }
      callback({ ...response, data: res._id })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: error?.statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
  async details(req, res, callback) {
    const trade_id = req.params.trade_id
    try {
      let response = {
        message: `Trade info`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const requiredInputs = {
        trade_id
      }
      const { success, key } = await validateInputs(requiredInputs)
      if (!success) {
        return callback({
          message: `Invalid or missing input: ${key}`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      }

      const trade = new Trade()
      const res = await trade.details({ trade_id, user_id: req.user._id.toString() })
      if (!res) {
        throw new AppError('Trade not found', status.HTTPS.NOT_FOUND)
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
  async getList(req, res, callback) {

    const { account_id, filter } = req.body
    let statusCode = ''
    try {
      let response = {
        message: `Trade list fecthed successfully`,
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

      const trade = new Trade()
      const res = await trade.getList({ user_id: req.user._id.toString(), account_id, filter })

      callback({ ...response, data: res })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
  async tradeStats(req, res, callback) {
    const { account_id, filter } = req.body
    try {
      let response = {
        message: `Trade stat fecthed successfully`,
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

      const trade = new Trade()
      const res = await trade.getTradeStats({ user_id: req.user._id.toString(), account_id, filter })

      callback({ ...response, data: res })
    } catch (error) {
      callback({
        message: `Error: ${error.message}`,
        success: false,
        statusCode: error?.statusCode || status.HTTPS.UNKNOWN_ERROR
      })
    }
  }
  async deleteTrade(req, res, callback) {
    const trade_id = req.params.trade_id
    const { account_id } = req.body
    try {
      let response = {
        message: `Trade deleted successfully`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const requiredInputs = {
        account_id, trade_id
      }
      const { success, key } = await validateInputs(requiredInputs)
      if (!success) {
        return callback({
          message: `Invalid or missing input: ${key}`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      }

      const trade = new Trade()
      const res = await trade.deleteTrade({ ...requiredInputs, user_id: req.user._id.toString() })
      if (!res._id) {
        throw new AppError('DB Error', status.HTTPS.DB_ERROR)
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
  async updateTrade(req, res, callback) {
    const trade_id = req.params.trade_id
    const {
      account_id,
      symbol, order_type, desc, open_time, close_time, entry_price, exit_price, qty, pnl, charges } = req.body
    let statusCode = ''
    try {
      let response = {
        message: `Trade updated successfully`,
        success: true,
        statusCode: status.HTTPS.SUCCESS
      }

      const requiredInputs = {
        account_id,
        trade_id,
        symbol,
        order_type,
        open_time,
        close_time,
        entry_price,
        exit_price,
        qty,
        pnl
      }
      const { success, key } = await validateInputs(requiredInputs)
      if (!success) {
        return callback({
          message: `Invalid or missing input: ${key}`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      } else if (isNaN(pnl) || isNaN(qty) || isNaN(entry_price) || isNaN(exit_price)) {
        return callback({
          message: `Invalid input:`,
          success: false,
          statusCode: status.HTTPS.BAD_REQUEST
        })
      }

      const trade = new Trade();
      const res = await trade.update({ ...requiredInputs, desc, charges, user_id: req.user._id.toString() })
      if (!res) {
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
module.exports = TradeSrvc
