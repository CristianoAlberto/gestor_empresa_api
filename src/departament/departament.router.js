const express = require('express')
const router = express.Router()
const departamentController = require('./departament.controller')

router.get('/departamentGet', departamentController.getAllDepartament)
router.post('/departamentCreate', departamentController.createDepartament)
router.put('/departamentUpdate/:id', departamentController.updateDepartament)
router.delete('/departamentDelete/:id', departamentController.deleteDepartament)

module.exports = router