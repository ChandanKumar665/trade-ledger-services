const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const path = require('path')
const { allowedDomain } = require('./config')
const api_v1 = require('./api/v1')
const app = express()
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({
    origin: allowedDomain,
    credentials: true
}));

app.use(cookieParser());

app.use((req, res, next) => {
    console.log("=== AUTH ME ===");
    console.log("Cookie header:", req.headers.cookie);
    console.log("req.cookies:", req.cookies);
    console.log("Origin:", req.headers.origin);
    console.log("Host:", req.headers.host);
    console.log("referer:", req.headers.referer);
    console.log("forwardedHost:", req.headers["x-forwarded-host"]);
    console.log("forwardedProto:", req.headers["x-forwarded-proto"]);
    console.log("all headers:", req.headers);
    next();
});
app.use('/api/v1', api_v1);

//set static folder
app.use(express.static('.'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')) //relative path
});


const { connectMongooseDB } = require('./services/db')

connectMongooseDB().then(() => {
    server.listen(PORT, async () => {
        console.log(`Server started at port ${PORT}`)
    })
}).catch(err => console.log(err));

