const express = require('express')
const router = express.Router()
const employeeController = require('./employee.controller')

router.get('./userEmployeeGet', employeeController.getAllUsers)
router.post('./userEmployeeCreate', employeeController.getAllUsers)
router.put('./userEmployeeUpdate/:id', employeeController.getAllUsers)
router.delete('./userEmployeeDelete/:id', employeeController.getAllUsers)


module.exports = router