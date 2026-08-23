const status = require('../https_status');
const jwt = require('jsonwebtoken');
const User = require('../services/User');
const AppError = require('../utils/AppError');

const auth = async (req, res, next) => {
    try {
        console.log("COOKIE HEADER--------->", req.headers.cookie);
        console.log("PARSED COOKIES-------->", req.cookies);
        const { token } = req.cookies;
        if (!token) {
            throw new AppError('Token is not present', status.HTTPS.UNAUTHORIZED);
        }
        const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedData?._id) {
            throw new AppError('Invalid token', status.HTTPS.UNAUTHORIZED);
        }
        const user = new User();
        const result = await user.profile({ user_id: decodedData._id, phone: decodedData.phone });
        req.user = result;
        next();
    } catch (error) {
        res.status(error?.statusCode || status.HTTPS.UNKNOWN_ERROR).json({
            message: `Error: ${error.message}`,
            success: false,
            statusCode: error?.statusCode || status.HTTPS.UNKNOWN_ERROR
        })
    }
}
module.exports = { auth }