const mongoose = require('mongoose');
const { isEmail } = require('validator')
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
}, { timestamps: true });

userSchema.methods.getJWTToken = async function () {
    const token = await jwt.sign({ _id: this._id.toString(), phone: this.phone }, process.env.JWT_KEY, { expiresIn: "7d" });
    return token
}
module.exports = mongoose.model('users', new Schema(userSchema, { timestamps: true }))