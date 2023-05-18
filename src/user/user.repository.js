const userEntity = require('./user.entity')
const { hash, compare } = require('bcrypt')

class UserRepository {
    async getAllUsers() {
        try {
            const dataUser = await userEntity.findAll()
            if (dataUser) return dataUser
        } catch (error) {
            throw error
        }
    }

    async createUser(dataUser) {
        try {
            const { name, email, number, password, picture } = dataUser
            if (name.trim() !== '' && email.trim() !== '' && number !== undefined && !isNaN(number) &&
                number.toString().trim() !== '' && password.trim() !== '' && picture.trim() !== '') {

                const validateExist = await userEntity.findOne({ where: { email } })

                if (validateExist) return { message: 'Erro!Não podes criar um usuário com esse email pois ja existe' }

                const pass = hash(8, password)
                const createUser = await userEntity.create({
                    name,
                    email,
                    number,
                    password: pass,
                    picture
                })

                if (createUser) return { message: 'Usuario criado com sucesso', createUser }

            } return { message: 'Todos os campos devem ser preenchidos!!!' }

        } catch (error) {
            throw error
        }
    }

    async updateUser(dataUser) {
        try {
            const { id, name, email, number, password, oldPassword, picture } = dataUser
            if (id !== undefined && !isNaN(id) && id.toString().trim() && name.trim() !== '' &&
                email.trim() !== '' && number !== undefined && !isNaN(number) &&
                number.toString().trim() !== '' && password.trim() !== '' && picture.trim() !== '') {

                const passOld = hash(8, oldPassword)
                const pass = hash(8, password)
                const updateUser = await userEntity.findByPk(id)

                if (updateUser !== undefined && updateUser !== null) {
                    if (!(await compare(passOld, updateUser.password))) return { message: " erro password invalida" }
                    updateUser.update({
                        name,
                        email,
                        number,
                        pass,
                        picture
                    })
                    if (updateUser > 0) return { message: 'Actualizado com sucesso' }
                }
                return { message: 'Usuario não existe' }

            } return { message: 'Todos os campos devem ser preenchidos!!!' }
        } catch (error) {
            throw error
        }
    }

    async deleteUser(dataUser) {
        try {
            const { id } = dataUser
            if (id !== undefined && !isNaN(id) && id.toString().trim() !== '') {
                const deleteUser = await userEntity.destroy({ where: id })
                if (deleteUser > 0) return { message: 'Usuário eliminado com ssucesso' }
            } return { message: 'O campo deve ser preenchido!!!' }
        } catch (error) {
            throw error
        }
    }
}

module.exports = new UserRepository()