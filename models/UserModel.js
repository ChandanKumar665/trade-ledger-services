const mongoose = require('mongoose');
const { isEmail } = require('validator')
const Schema = mongoose.Schema;

const userSchema = {
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    phone: {
        type: Number,
        unique: true,
        required: [true, 'User phone number required'],
    },
    trading_exp: {
        type: String,
        default: '0 years'
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: isEmail
        }
    },
    bio: {
        type: String,
        trim: true
    },
}

module.exports = mongoose.model('users', new Schema(userSchema, { timestamps: true }))