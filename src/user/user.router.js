const express = require('express')
const router = express.Router()
const userController = require('./user.controller')
const multer = require('../middleware/multer')
const auth = require('../middleware/auth')

router.get('/userGet', auth.authorize, userController.getAllUsers)
router.post('/userCreate', auth.authorize, multer.single('picture'), userController.createUser)
router.put('/userUpdate/:id', auth.authorize, multer.single('picture'), userController.updateUser)
router.delete('/userDelete/:id', auth.authorize, userController.deleteUser)

router.use((err, req, res, next) => {
    if (err.message === 'Tipo de arquivo inválido') {
        return res.status(422).send({ message: 'O tipo de arquivo enviado é inválido' });
    }
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(422).send({ message: 'O tamanho do arquivo excede o limite permitido' });
    }
    next(err);
});

module.exports = router