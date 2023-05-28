const express = require('express')
const router = express.Router()
const positionController = require('./position.controller')
const auth = require('../middleware/auth')

router.get('/positionGet', auth.authorize, positionController.getAllPositions)
router.get('/positionGetId/:id', auth.authorize, positionController.getPositionById)
router.post('/positionCreate', auth.authorize, positionController.createPosition)
router.put('/positionUpdate/:id', auth.authorize, positionController.updatePosition)
router.delete('/positionDelete/:id', auth.authorize, positionController.deletePosition)

module.exports = router