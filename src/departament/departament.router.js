const express = require('express')
const router = express.Router()
const departamentController = require('./departament.controller')
const auth = require('../middleware/auth')

router.get('/departamentGet', auth.authorize, departamentController.getAllDepartament)
router.get('/departamentGetId/:id', auth.authorize, departamentController.getDepartamentById)
router.post('/departamentCreate', auth.authorize, departamentController.createDepartament)
router.put('/departamentUpdate/:id', auth.authorize, departamentController.updateDepartament)
router.delete('/departamentDelete/:id', auth.authorize, departamentController.deleteDepartament)

module.exports = router