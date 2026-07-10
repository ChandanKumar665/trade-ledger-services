const dotenv = require('dotenv')
dotenv.config()
const { client } = require('./db')
const AccountModel = require('../models/AccountModel')

class Account {
    constructor() {
        this.db = client.db(process.env.DB)
        this.collection = this.db.collection('accounts');
    }

    async create(input) {
        const { name, curr, initial_cap, user_id } = input
        const account = new AccountModel({ name, curr, initial_cap, user_id })
        const res = await account.save()
        return res
    }
    async getList(input) {
        const { user_id } = input
        const res = await AccountModel.find({ user_id })
        return res
    }
}
module.exports = Account