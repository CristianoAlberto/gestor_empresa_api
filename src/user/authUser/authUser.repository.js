const authUserEntity = require('../user.entity')
const authUserInterface = require('./authUser.interface')
const authUser = require('../../utils/auth')
const { compare } = require('bcrypt');
const userEntity = require('../user.entity');

class AuthUserRepository {

    async userSignUp(authUserData) {
        const isValidData = Object.entries(authUserInterface).every(([key, expectedType]) => {
            const actualType = typeof authUserData[key]
            return actualType === expectedType.name.toLowerCase()
        });

        if (isValidData.includes(false)) {
            throw new Error('Dados inválidos para criação do usuário');
        }

        try {
            const { email, password } = authUserData
            if (email.trim() !== '' && password.trim() !== '') {
                const validateExist = await userEntity.findOne({ where: { email } })
                if (!validateExist && !(await compare(password, validateExist.password))) return { message: 'Email ou senha não esta correta' }
                const token = await authUser.generateToken(validateExist.id)
                const decodedToken = await authUser.decodeToken(token)
                return { usuario: { id: decodedToken.id, nome: validateExist.name, email: validateExist.email }, token: { token }, }

            }
        } catch (error) {
            throw error
        }
    }

    async userLogOut() {
        try {
            return await { usuario: { nome: '', email: "" }, token: '' }
        } catch (error) {
            throw error
        }
    }
}

module.exports = new AuthUserRepository()