const express = require('express')
const router = express.Router()
const employeeController = require('./employee.controller')

router.get('/employeeGet', employeeController.getAllEmployees)
router.post('/employeeCreate', employeeController.createEmployee)
router.put('/employeeUpdate/:id', employeeController.updateEmployee)
router.delete('/employeeDelete/:id', employeeController.deleteEmployee)

module.exports = router