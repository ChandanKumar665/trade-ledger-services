const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const client = new MongoClient(process.env.DB_STRING);

async function connectDB() {
    await client.connect();
    console.log('Connected to DB');
}

async function connectMongooseDB() {
    await mongoose.connect(`${process.env.DB2}`)
    console.log('Connected to DB using mongoose');
}
// connectDB()
module.exports = { connectDB, client, ObjectId, connectMongooseDB }