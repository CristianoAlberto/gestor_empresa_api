const positionEntity = require('./position.entity')
const positionInterface = require('./position.interface')

class PositionRepository {
    async getAllPosition() {
        try {
            const data = await positionEntity.findAll()
            return data
        } catch (error) {
            throw error
        }
    }

    async createPosition(positionData) {
        const isValidData = Object.entries(positionInterface).every(([key, expectedType]) => {
            const actualType = typeof positionData[key]
            return actualType === expectedType.name.toLowerCase()
        });

        if (isValidData.includes(false)) {
            throw new Error('Dados inválidos para criação do usuário');
        }

        try {
            const { name, base_salary, subsidy, net_salary } = positionData

            if (name.trim() !== '' && base_salary !== undefined && !isNaN(base_salary) &&
                base_salary.toString().trim() !== '' && subsidy !== undefined && !isNaN(subsidy) &&
                subsidy.toString().trim() !== '' && net_salary !== undefined && !isNaN(net_salary) &&
                net_salary.toString().trim() !== '') {

                const createPosition = await positionEntity.create({
                    name,
                    base_salary,
                    subsidy,
                    net_salary
                })

                if (createPosition) return { message: 'Departamento criado com sucesso', createDepartament }
            } return { message: 'Todos os campos devem ser preenchidos!!!' }
        } catch (error) {
            throw error
        }
    }

    async updatePosition(positionData) {
        const isValidData = Object.entries(departamentInterface).every(([key, expectedType]) => {
            const actualType = typeof departamentData[key]
            return actualType === expectedType.name.toLowerCase()
        });

        if (isValidData.includes(false)) {
            throw new Error('Dados inválidos para criação do usuário');
        }

        try {
            const { id, name, base_salary, subsidy, net_salary } = positionData

            if (id.trim() !== '' && name.trim() !== '' && base_salary !== undefined && !isNaN(base_salary) &&
                base_salary.toString().trim() !== '' && subsidy !== undefined && !isNaN(subsidy) &&
                subsidy.toString().trim() !== '' && net_salary !== undefined && !isNaN(net_salary) &&
                net_salary.toString().trim() !== '') {

                const validate = await positionEntity.findByPk(id)
                if (validate != null && validate != undefined) {
                    await validate.update({
                        name,
                        base_salary,
                        subsidy,
                        net_salary
                    })
                }
                return { message: 'Actualizado com sucesso' }
            } return { message: 'Todos os campos devem ser preenchidos!!!' }
        } catch (error) {
            throw error
        }
    }

    async deleteDepartament(positionData) {
        try {
            const { id } = positionData
            const deleteDepartament = await positionEntity.destroy({ where: id })
            if (deleteDepartament) return { message: 'Departamento eliminado com sucesso' }
        } catch (error) {
            throw error
        }
    }
}

module.exports = new PositionRepository()