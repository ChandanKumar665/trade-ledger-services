const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = {
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    curr: {
        type: String,
        required: [true, 'curr is required'],
        trim: true
    },
    initial_cap: {
        type: Number,
        required: true,
        trim: true
    },
    user_id: {
        type: String,
        required: [true, 'user id is required'],
        trim: true
    }
}

module.exports = mongoose.model('accounts', new Schema(accountSchema, { timestamps: true }))