const express = require('express')
const router = express.Router()
const departamentController = require('./departament.controller')

router.get('/departamentGet', departamentController.getAllDepartament)
router.post('/departamentGet', departamentController.createDepartament)
router.put('/departamentGet', departamentController.updateDepartament)
router.delete('/departamentGet', departamentController.deleteDepartament)

module.exports = router