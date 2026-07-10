const dotenv = require('dotenv')
dotenv.config()
const { client } = require('./db')
const UserModel = require('../models/UserModel');
const dates = { createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() }

class UserSrvc {
    constructor() {
        this.db = client.db(process.env.DB)
        this.collection = this.db.collection('users');
    }

    async create(input) {
        const { name, phone, trading_exp } = input
        const user = new UserModel({ name, phone, trading_exp });
        const res = await user.save();
        return res
    }
    async details(input) {
        const { phone } = input
        const res = await UserModel.findOne({ phone: '8210357799' });
        return res
    }
}
module.exports = UserSrvc