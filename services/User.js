const dotenv = require('dotenv')
dotenv.config()
const { client } = require('./db')
const dates = { createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() }

class UserSrvc {
    constructor() {
        this.db = client.db(process.env.DB)
        this.collection = this.db.collection('users');
    }

    async create(input) {
        const { name, phone, trading_exp } = input
        const res = await this.collection.insertOne({ name, phone, trading_exp, ...dates })
        return res
    }
    async details(input) {
        const { phone } = input
        const res = await this.collection.findOne({ phone })
        return res
    }
}
module.exports = UserSrvc