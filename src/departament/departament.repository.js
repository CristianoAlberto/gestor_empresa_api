const departamentEntity = require('./departament.entity')

class DepartamentRepository {
    async getAllDepartament() {
        try {
            const data = await departamentEntity.findAll()
            return data
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
            const { id } = departamentData
            if (id !== undefined && !isNaN(id) && id.toString().trim() !== '') {
                const deleteDepartament = await departamentEntity.destroy({ where: { id } })
                if (deleteDepartament) return { message: 'Departamento eliminado com sucesso' }
            } return { message: 'O campo é obrigatário' }
        } catch (error) {
            throw error
        }
    }
}

module.exports = new DepartamentRepository()