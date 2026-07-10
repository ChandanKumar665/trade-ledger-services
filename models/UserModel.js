const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = {
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    phone: {
        type: Number,
        required: [true, 'User phone number required'],
    },
    trading_exp: {
        type: String,
        default: '0 years'
    },
}

module.exports = mongoose.model('users', new Schema(userSchema, { timestamps: true }))