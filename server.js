const express = require('express');
const http = require('http');
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const api_v1 = require('./api/v1')
const app = express()
const useMongoose = true
const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors())
dotenv.config();



//set static folder
app.use(express.static('.'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')) //relative path
})

const { connectDB, client, connectMongooseDB } = require('./services/db')

app.use('/api/v1', api_v1)

const selectDB = useMongoose ? connectMongooseDB : connectDB
selectDB().then(() => {
    server.listen(PORT, async () => {
        console.log(`Server started at port ${PORT}`)
    })
}).catch(err => console.log(err));

