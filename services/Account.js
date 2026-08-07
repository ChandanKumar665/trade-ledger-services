const dotenv = require('dotenv')
dotenv.config()
const { ObjectId } = require('./db')
const AccountModel = require('../models/AccountModel')

class Account {
    constructor() { }

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
    async remove(input) {
        const { user_id, account_id } = input
        const res = await AccountModel.findOneAndDelete({ _id: new ObjectId(account_id), user_id });
        return res
    }
    async update(input) {
        const { name, curr, initial_cap, user_id, account_id } = input
        const res = await AccountModel.findOneAndUpdate({ _id: new ObjectId(account_id), user_id }, { name, curr, initial_cap });
        return res
    }
    async info(input) {
        const { user_id, account_id } = input
        const res = await AccountModel.findOne({ _id: new ObjectId(account_id), user_id });
        return res
    }
}
module.exports = Account