const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const TradeModel = require('../models/TradeModel');
const UserExchangeModel = require('../models/UserExchangeModel');

async function connectMongooseDB() {
    await mongoose.connect(`${process.env.DB2}`)
    await TradeModel.init()
    console.log("TradeModel indexes initialized");
    console.log('Connected to DB using mongoose');
}
module.exports = { ObjectId, connectMongooseDB }