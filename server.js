const express = require('express');
const http = require('http');
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const api_v1 = require('./api/v1')
const app = express()

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors())
dotenv.config();

app.use('/api/v1', api_v1)

//set static folder
app.use(express.static('.'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')) //relative path
})
server.listen(PORT, () => console.log(`Server started at port ${PORT}`))
