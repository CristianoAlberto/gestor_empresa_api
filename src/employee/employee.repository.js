const employeeEntitiy = require('./employee.entity')
const userEntity = require('../user/user.entity')
const { compare } = require('bcrypt')
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

                if (createEmployee) return { message: 'Funcionario criado com sucesso', createEmployee }

            } return { message: 'Todos os campos devem ser preenchidos!!!' }
        } catch (error) {
            throw error
        }
    }

    async updateEmployee(employeeData) {
        try {
            const { id, name, adress, number, email, picture, positionId, departamentId } = employeeData
            if (id !== undefined && !isNaN(id) && id.toString().trim() !== '' && name.trim() !== ''
                && adress.trim() !== '' && number !== undefined && !isNaN(number)
                && number.toString().trim() !== '' && picture.trim() !== '' && departamentId !== undefined && !isNaN(departamentId) &&
                departamentId.toString().trim() !== '' && positionId !== undefined && !isNaN(positionId) && positionId.toString().trim() !== '') {

                const updateEmployee = await employeeEntitiy.findByPk(id)
                if (updateEmployee !== null && updateEmployee !== undefined) {

                    await updateEmployee.update({
                        name,
                        adress,
                        number,
                        email,
                        picture,
                        positionId,
                        departamentId
                    })


                    if (updateEmployee) return { message: 'Funcionário actualizado com sucesso' }
                }
                return { message: 'Funcionário não existe' }
            } return { message: 'Todos os campos devem ser preenchidos!' }
        } catch (error) {
            throw error
        }
    }

    async deleteEmployee(employeeData) {
        try {
            const { id, userId, password } = employeeData
            if (id !== undefined && !isNaN(id) && id.toString().trim() !== '' && password.trim() !== '' && userId !== undefined && !isNaN(userId) && userId.toString().trim() !== '') {
                const user = await userEntity.findOne({ where: { userId } })
                if (!user) return { message: 'Não tens autorização para eliminar!!' }
                if (!(await compare(password, user.password))) return { message: 'password errada!!' }
                const deleteEmployee = await employeeEntitiy.destroy({ where: { employeeId: id } })
                if (deleteEmployee) return { message: 'Funcionário eliminado com sucesso' }
            } return { message: 'O campo é obrigatório' }

        } catch (error) {
            throw error
        }
    }
}

module.exports = new EmployeeRepository()

