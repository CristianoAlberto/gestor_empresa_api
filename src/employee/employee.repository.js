const employeeEntitiy = require('./employee.entity')

class EmployeeRepository {
    async getAllEmployees() {
        try {
            const data = await employeeEntitiy.findAll()
            return data
        } catch (error) {
            throw error
        }
    }

    async createEmployee(employeeData) {
        try {
            const { name, adress, number, email, picture, positionId, departamentId } = employeeData

            if (name.trim() !== '' && adress.trim() !== '' && number !== undefined && !isNaN(number)
                && number.toString().trim() !== '' && picture.trim() !== '') {

                const createEmployee = await employeeEntitiy.create({

                    name,
                    adress,
                    number,
                    email,
                    picture,
                    positionId,
                    departamentId
                });

                if (createEmployee) return { message: 'Funcionario criado com sucesso', createdUser }

            } return { message: 'Todos os campos devem ser preenchidos!!!' }
        } catch (error) {
            throw error
        }
    }

    async updateEmployee(employeeData) {
        try {
            const { id, name, adress, number, email, picture, position, departament } = employeeData
            if (id !== undefined && !isNaN(id) && id.toString().trim() !== '' && name.trim() !== ''
                && adress.trim() !== '' && number !== undefined && !isNaN(number)
                && number.toString().trim() !== '' && picture.trim() !== '' && departament.trim() !== '') {

                const validate = await employeeEntitiy.findByPk(id)
                if (validate !== null && validate !== undefined) {

                    await validate.update({
                        name,
                        adress,
                        number,
                        email,
                        picture,
                        position,
                        departament
                    })


                    if (updateEmployee > 0) return { message: 'Funcionário actualizado com sucesso' }
                }
                return { message: 'Funcionário não existe' }
            } return { message: 'Todos os campos devem ser preenchidos!' }
        } catch (error) {
            throw error
        }
    }

    async deleteEmployee(employeeData) {
        try {
            const { id } = employeeData
            if (id !== undefined && !isNaN(is) && id.toString().trim() !== '') {
                const deleteEmployee = await employeeEntitiy.destroy({ where: { id } })
                if (deleteEmployee) return { messga: 'Funcionário eliminado com sucesso' }
            } return { message: 'O campo é obrigatório!!' }

        } catch (error) {
            throw error
        }
    }
}

module.exports = new EmployeeRepository()

