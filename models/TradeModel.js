const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = {
    symbol: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    order_type: {
        type: String,
        required: [true, 'User phone number required'],
    },
    desc: {
        type: String
    },
    open_time: {
        type: String,
        required: [true, 'open_time is required']
    },
    close_time: {
        type: String,
        required: [true, 'close_time is required']
    },
    entry_price: {
        type: Number,
        required: [true, 'entry_price is required']
    },
    exit_price: {
        type: Number,
        required: [true, 'exit_price is required']
    },
    qty: {
        type: Number,
        required: [true, 'qty is required']
    },
    pnl: {
        type: Number,
        required: [true, 'pnl is required']
    },
    charges: {
        type: Number,
    },
    account_id: {
        type: String,
        required: [true, 'account id is required']
    },
    user_id: {
        type: String,
        required: [true, 'user id is required']
    },
}

module.exports = mongoose.model('trades', new Schema(tradeSchema, { timestamps: true }))