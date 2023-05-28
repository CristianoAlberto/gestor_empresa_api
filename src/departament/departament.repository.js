const departamentEntity = require('./departament.entity')
const userEntity = require('../user/user.entity')
const { compare } = require('bcrypt')

class DepartamentRepository {
    async getAllDepartament() {
        try {
            const data = await departamentEntity.findAll()
            return data
        } catch (error) {
            throw error
        }
    }

    async getDepartamentById(departamentData) {
        try {
            const { id } = departamentData
            if (id !== undefined && !isNaN(id) && id.toString().trim !== '') {
                const data = await departamentEntity.findByPk(id)
                if (data) return data
                return
            } return { message: 'O campo deve ser preenchidos!!!' }
        } catch (error) {
            throw error
        }
    }


    async createDepartament(departamentData) {
        try {

            const { name, acronym } = departamentData

            if (name.trim() !== '' && acronym.trim() !== '') {
                const createDepartament = await departamentEntity.create({
                    name,
                    acronym
                })
                if (createDepartament) return { message: 'Departamento criado com sucesso', createDepartament }
            } return { message: 'Todos os campos devem ser preenchidos!!!' }
        } catch (error) {
            throw error
        }
    }

    async updateDepartament(departamentData) {
        try {
            const { id, name, acroynm } = departamentData
            if (id.trim() !== '' && name.trim() !== '' && acroynm.trim() !== '') {
                const validate = await departamentEntity.findByPk(id)
                if (validate != null && validate != undefined) {
                    validate.update({
                        name,
                        acroynm
                    })
                }
                return { message: 'Actualizado com sucesso' }
            } return { message: 'Todos os campos devem ser preenchidos!!!' }
        } catch (error) {
            throw error
        }
    }

    async deleteDepartament(departamentData) {
        try {

            const { id, userId, password } = departamentData
            if (id !== undefined && !isNaN(id) && id.toString().trim() !== '' && password.trim() !== '' && userId !== undefined && !isNaN(userId) && userId.toString().trim() !== '') {
                const user = await userEntity.findOne({ where: { userId } })
                if (!user) return { message: 'Não tens autorização para eliminar!!' }
                if (!(await compare(password, user.password))) return { message: 'password errada!!' }
                const deleteDepartament = await departamentEntity.destroy({ where: { departamentId: id } })
                if (deleteDepartament) return { message: 'Departamento eliminado com sucesso' }
            } return { message: 'O campo é obrigatório' }
        } catch (error) {
            throw error
        }
    }
}

module.exports = new DepartamentRepository()