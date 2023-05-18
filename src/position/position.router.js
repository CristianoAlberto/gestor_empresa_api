const express = require('express')
const router = express.Router()
const positionController = require('./position.controller')

router.get('/positionGet', positionController.getAllPositions)
router.post('/positionCreate', positionController.createPosition)
router.put('/positionUpdate', positionController.updatePosition)
router.delete('/positionDelete', positionController.deletePosition)

module.exports = router