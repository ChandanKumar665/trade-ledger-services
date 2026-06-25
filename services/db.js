const { MongoClient, ObjectId } = require('mongodb')
const client = new MongoClient(process.env.DB_STRING);

async function connectDB() {
    await client.connect();
    console.log('Connected to DB');
}
// connectDB()
module.exports = { connectDB, client, ObjectId }