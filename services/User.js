const dotenv = require('dotenv')
dotenv.config()
const { client, ObjectId } = require('./db')
const UserModel = require('../models/UserModel');

class User {
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
    async search(input) {
        const { phone } = input
        const res = await UserModel.findOne({ phone });
        return res
    }
    async profile(input) {
        const { user_id } = input
        const res = await UserModel.findOne({ _id: new ObjectId(user_id) });
        return res
    }
    async update(input) {
        const { user_id, trading_exp, email, bio, name } = input
        const res = await UserModel.findOneAndUpdate({ _id: new ObjectId(user_id) }, { trading_exp, email, bio, name });
        return res
    }
}
module.exports = User