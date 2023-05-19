const express = require('express')
const router = express.Router()
const employeeController = require('./employee.controller')
const auth = require('../middleware/auth')

router.get('/employeeGet', auth.authorize, employeeController.getAllEmployees)
router.post('/employeeCreate', auth.authorize, employeeController.createEmployee)
router.put('/employeeUpdate/:id', auth.authorize, employeeController.updateEmployee)
router.delete('/employeeDelete/:id', auth.authorize, employeeController.deleteEmployee)

module.exports = router