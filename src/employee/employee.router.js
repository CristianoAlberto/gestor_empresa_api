const express = require('express')
const router = express.Router()
const employeeController = require('./employee.controller')

router.get('./userEmployeeGet', employeeController.getAllUsers)
router.post('./userEmployeeCreate', employeeController.createEmployee)
router.put('./userEmployeeUpdate/:id', employeeController.updateEmployee)
router.delete('./userEmployeeDelete/:id', employeeController.deleteEmployee)


module.exports = router