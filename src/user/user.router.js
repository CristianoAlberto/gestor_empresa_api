const express = require('express')
const router = express.Router()
const userController = require('./user.controller')

router.get('/userGet', userController.getAllUsers)
router.post('/userCreate', userController.createUser)
router.post('/userUpdate/:id', userController.updateUser)
router.delete('/userDelete/:id', userController.deleteUser)

module.exports = router