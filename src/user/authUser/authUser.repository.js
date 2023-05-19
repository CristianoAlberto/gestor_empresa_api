const authUserEntity = require('../user.entity')
const authUser = require('../../middleware/auth')
const { compare } = require('bcrypt');

class AuthUserRepository {

    async userSignUp(authUserData) {
        try {
            const { email, password } = authUserData

            if (email.trim() !== '' && password.trim() !== '') {
                const validateExist = await authUserEntity.findOne({ where: { email } })
                if (validateExist !== null) {
                    if (!(await compare(password, validateExist.password))) return { message: 'Email ou senha não esta correta' }
                    const token = await authUser.generateToken(validateExist.userId)
                    const decodedToken = await authUser.decodeToken(token)
                    return { usuario: { id: decodedToken.id, nome: validateExist.name, email: validateExist.email }, token: { token }, }
                } return { message: 'Email ou senha não esta correta' }
            } return { message: 'Todos os campos devem ser preenchidos!!' }
        } catch (error) {
            throw error
        }
    }

    async userLogOut() {
        try {
            return await { usuario: { id: '', nome: '', email: "" }, token: '' }
        } catch (error) {
            throw error
        }
    }
}

module.exports = new AuthUserRepository()