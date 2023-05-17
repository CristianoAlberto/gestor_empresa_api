const express = require('express')
const router = express.Router()
const employeeController = require('./employee.controller')

router.get('./userEmployee', employeeController.getAllUsers)

module.exports = router