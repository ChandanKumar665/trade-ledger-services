const dotenv = require('dotenv')
dotenv.config()
const { client } = require('./db')
const UserModel = require('../models/UserModel');

class UserSrvc {
    constructor() {
        this.db = client.db(process.env.DB)
        this.collection = this.db.collection('users');
    }

    async create(input) {
        try {
            const { name, phone, email, trading_exp } = input
            const user = new UserModel({ name, phone, email, trading_exp });
            const res = await user.save();
            return { success: true, data: res }
        } catch (error) {
            if (error.code === 11000 && error.keyPattern?.phone) {
                return {
                    success: false,
                    msg: 'Phone number already exists.',
                    statusCode: 400
                }
            }
            throw err;
        }
    }
    async details(input) {
        const { phone } = input
        const res = await UserModel.findOne({ phone });
        return res
    }
}
module.exports = UserSrvc