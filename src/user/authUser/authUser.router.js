const express = require('express')
const router = express.Router()
const authUserController = require('./authUser.controller')


router.post('/userSignUp', authUserController.userSignUp)
router.get('/userLogOut', authUserController.userLogOut)

module.exports = router