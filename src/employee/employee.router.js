const express = require('express')
const router = express.Router()
const employeeController = require('./employee.controller')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')


router.get('/employeeGet', auth.authorize, employeeController.getAllEmployees)
router.get('/employeeGetId/:id', auth.authorize, employeeController.getEmployeeById)
router.post('/employeeCreate', multer.single('picture'), auth.authorize, employeeController.createEmployee)
router.put('/employeeUpdate/:id', multer.single('picture'), auth.authorize, employeeController.updateEmployee)
router.delete('/employeeDelete/:id', auth.authorize, employeeController.deleteEmployee)

module.exports = router