const https_status = require('../https_status');
const jwt = require('jsonwebtoken');
const User = require('../services/User');

const auth = async (req, res, callback) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw Error('Token is not present');
        }
        const decodedData = await jwt.verify(token, process.env.JWT_KEY);
        if (!decodedData?._id) {
            throw Error('Invalid token');
        }
        const user = new User();
        const result = await user.profile({ user_id: decodedData._id });
        req.user = result;
        next();
    } catch (error) {
        return callback({
            message: `Error: ${error.message}`,
            success: false,
            statusCode: statusCode || status.HTTPS.UNKNOWN_ERROR
        })
    }
}
module.exports = { auth }