const dotenv = require('dotenv')
dotenv.config()
const { client } = require('./db')
const dates = { createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() }

class Account {
    constructor() {
        this.db = client.db(process.env.DB)
        this.collection = this.db.collection('accounts');
    }

    async create(input) {
        const { name, curr, initial_cap, user_id } = input
        const res = await this.collection.insertOne({ name, curr, initial_cap, user_id, ...dates })
        return res
    }
    async getList(input) {
        const { user_id } = input
        const res = await this.collection.find({ user_id }).toArray()
        return res
    }
}
module.exports = Account