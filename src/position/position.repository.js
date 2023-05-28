const positionEntity = require('./position.entity')
const userEntity = require('../user/user.entity')
const { compare } = require('bcrypt')

class PositionRepository {
    async getAllPosition() {
        try {
            const data = await positionEntity.findAll()
            return data
        } catch (error) {
            throw error
        }
    }

    async getPositionById(positionData) {
        try {
            const { id } = positionData
            if (id !== undefined && !isNaN(id) && id.toString().trim !== '') {
                const data = await positionEntity.findByPk(id)
                if (data) return data
                return
            } return { message: 'O campo deve ser preenchidos!!!' }
        } catch (error) {
            throw error
        }
    }

    async createPosition(positionData) {
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

                if (createPosition) return { message: 'Cargo criado com sucesso', createPosition }
            } return { message: 'Todos os campos devem ser preenchidos!!!' }
        } catch (error) {
            throw error
        }
    }

    async updatePosition(positionData) {
        try {
            const { id, name, base_salary, subsidy, net_salary } = positionData

            if (id !== undefined && !isNaN(id) && id.toString().trim() !== '' && name.trim() !== '' && base_salary !== undefined && !isNaN(base_salary) &&
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

    async deletePosition(positionData) {
        try {
            const { id, userId, password } = positionData
            if (id !== undefined && !isNaN(id) && id.toString().trim() !== '' && password.trim() !== '' && userId !== undefined && !isNaN(userId) && userId.toString().trim() !== '') {
                const user = await userEntity.findOne({ where: { userId } })
                if (!user) return { message: 'Não tens autorização para eliminar!!' }
                if (!(await compare(password, user.password))) return { message: 'password errada!!' }
                const deletePosition = await positionEntity.destroy({ where: { positionId: id } })
                if (deletePosition) return { message: 'Cargo eliminado com sucesso' }
            } return { message: 'O campo é obrigatório' }
        } catch (error) {
            throw error
        }
    }
}

module.exports = new PositionRepository()