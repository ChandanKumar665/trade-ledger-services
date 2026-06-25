/**
 * @file
 * This file for routing all request for all API module
 *  user registration and authentication.
 */

const router = require('express').Router()

// define your routes
router.use('/user', require('./SignUp/signUpRoute'))
router.use('/user/auth', require('./Auth/authRoute'))
router.use('/trade', require('./Trade-Journal/tradeRoute'))
router.use('/account', require('./Portfolio/portfolioRoute'))



module.exports = router