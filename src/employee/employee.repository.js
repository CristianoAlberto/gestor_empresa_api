const employeeEntitiy = require('./employee.entity')
const employeeInterface = require('./employee.interface')

class EmployeeRepository {
    async getAllEmployee() {
        try {
            const data = await employeeEntitiy.findAll()
            return data
        } catch (error) {
            throw error
        }
    }

    async createEmployee(userEmployeeData) {

        const isValidData = Object.entries(employeeInterface).every(([key, expectedType]) => {
            const actualType = typeof userEmployeeData[key]
            return actualType === expectedType.name.toLowerCase()
        });

        if (isValidData.includes(false)) {
            throw new Error('Dados inválidos para criação do usuário');
        }
        try {
            const { name, adress, number, email, picture, position, departament } = userEmployeeData

            if (name.trim() !== '' && adress.trim() !== '' && number !== undefined && !isNaN(number)
                && number.toString().trim() !== '' && picture.trim() !== '' && departament.trim() !== '') {

                const createdUserEmployee = await employeeEntitiy.create({
                    name,
                    adress,
                    number,
                    email,
                    picture,
                    position, departament
                });

                if (createdUserEmployee) return { message: 'Funcionario criado com sucesso', createdUser }

            } return { message: 'Todos os campos devem ser preenchidos!!!' }
        } catch (error) {
            throw error
        }
    }

    async updateEmployee(userEmployeeData) {
        const isValidData = Object.entries(employeeInterface).every(([key, expectedType]) => {
            const actualType = typeof userEmployeeData[key]
            return actualType === expectedType.name.toLocaleLowerCase()
        })

        if (isValidData.includes(false)) {
            throw new Error('Dados invalidos para a criação do usuário')
        }

        try {
            const { id, name, adress, number, email, picture, position, departament } = userEmployeeData
            if (id !== undefined && !isNaN(id) && id.toString().trim() !== '' && name.trim() !== ''
                && adress.trim() !== '' && number !== undefined && !isNaN(number)
                && number.toString().trim() !== '' && picture.trim() !== '' && departament.trim() !== '') {

                const validate = await employeeEntitiy.findByPk(id)
                if (validate !== null && validate !== undefined) {

                    const updateUserEmployee = await employeeEntitiy.update({
                        name,
                        adress,
                        number,
                        email,
                        picture,
                        position,
                        departament
                    })


                    if (updateUserEmployee > 0) return { message: 'Funcionário actualizado com sucesso' }
                }
                return { message: 'Funcionário não existe' }
            } return { message: 'Todos os campos devem ser preenchidos!' }
        } catch (error) {
            throw error
        }
    }

    async deleteEmployee(userEmployeeData) {
        try {
            const { id } = userEmployeeData
            const deleteEmployee = await employeeEntitiy.destroy({ where: id })
            if (deleteEmployee) return { messga: 'Funcionário eliminado com sucesso' }

        } catch (error) {
            throw error
        }
    }
}

module.exports = new EmployeeRepository()

