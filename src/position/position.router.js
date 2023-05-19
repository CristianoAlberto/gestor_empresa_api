const express = require('express')
const router = express.Router()
const positionController = require('./position.controller')

router.get('/positionGet', positionController.getAllPositions)
router.post('/positionCreate', positionController.createPosition)
router.put('/positionUpdate/:id', positionController.updatePosition)
router.delete('/positionDelete/:id', positionController.deletePosition)

module.exports = router