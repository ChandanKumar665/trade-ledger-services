/**
 * @file
 * This file for routing all request for all API module
 *  user registration and authentication.
 */

const router = require('express').Router()

// define your routes
router.use('/user', require('./SignUp/signUpRoute'))

module.exports = router