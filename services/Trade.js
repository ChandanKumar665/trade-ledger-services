const dotenv = require('dotenv')
dotenv.config()
const { client, ObjectId } = require('./db')
const dates = { createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() }

class Trade {
    constructor() {
        this.db = client.db(process.env.DB)
        this.collection = this.db.collection('trades');
    }

    async create(input) {
        const { symbol,
            order_type,
            desc,
            open_time,
            close_time,
            entry_price,
            exit_price,
            qty,
            pnl,
            user_id,
            account_id
        } = input
        const res = await this.collection.insertOne({
            symbol,
            order_type: order_type.toUpperCase(),
            desc,
            open_time,
            close_time,
            entry_price,
            exit_price,
            qty,
            pnl,
            user_id,
            account_id, ...dates
        })
        return res
    }
    async details(input) {
        const { trade_id } = input
        const res = await this.collection.findOne({ _id: new ObjectId(trade_id) })
        return res
    }
    async getList(input) {
        const { user_id, account_id } = input
        const res = await this.collection.find({ user_id, account_id }).toArray()
        return res
    }
}
module.exports = Trade