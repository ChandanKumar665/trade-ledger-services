const express = require('express');
const http = require('http');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const path = require('path')
const { allowedDomain } = require('./config')
const api_v1 = require('./api/v1')
const app = express()
const useMongoose = true
const cookieParser = require('cookie-parser')
const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: allowedDomain,
    credentials: true
}))

app.use('/api/v1', api_v1)


//set static folder
app.use(express.static('.'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')) //relative path
})

const { connectDB, client, connectMongooseDB } = require('./services/db')


const selectDB = useMongoose ? connectMongooseDB : connectDB
selectDB().then(() => {
    server.listen(PORT, async () => {
        console.log(`Server started at port ${PORT}`)
    })
}).catch(err => console.log(err));

