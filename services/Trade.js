const dotenv = require('dotenv')
dotenv.config()
const { client, ObjectId } = require('./db')
const TradeModel = require('../models/TradeModel')
const dates = { createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() }

class Trade {
    constructor() {
        this.db = client.db(process.env.DB)
        this.collection = this.db.collection('trades');
    }

    async create(input) {
        const trade = new TradeModel(input);
        const res = await trade.save();
        return res
    }
    async details(input) {
        const { trade_id } = input
        const res = await TradeModel.findOne({ _id: new ObjectId(trade_id) })
        return res
    }
    async getList(input) {
        const { user_id, account_id } = input
        const res = await TradeModel.find({ user_id, account_id })
        return res
    }
}
module.exports = Trade