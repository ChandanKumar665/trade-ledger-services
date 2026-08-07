const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose')

async function connectMongooseDB() {
    await mongoose.connect(`${process.env.DB2}`)
    console.log('Connected to DB using mongoose');
}
module.exports = { ObjectId, connectMongooseDB }