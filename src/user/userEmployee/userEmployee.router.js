const express = require('express')
const router = express.Router()
const userEmployeeController = require('./userEmployee.controller')

router.get('./userEmployee', userEmployeeController.getAllUsers)

module.exports = router