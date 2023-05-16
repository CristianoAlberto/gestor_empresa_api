const userEmployee = require('./userEmployee.entity')
const UserEmployeeInterface = require('./userEmployee.interface')

class UserEmployeeRepository {
    async getAllUsers() {
        try {
            const data = await userEmployee.findAll()
            return data
        } catch (error) {
            throw error
        }
    }

    async createUserEmployee(userEmployeeData) {

        const isValidData = Object.entries(UserEmployeeInterface).every(([key, expectedType]) => {
            const actualType = typeof userData[key];
            return actualType === expectedType.name.toLowerCase();
        });

        if (isValidData.includes(false)) {
            throw new Error('Dados inválidos para criação do usuário');
        }
        try {
            const createdUser = await UserEmployee.create(userEmployeeData);
            return createdUser
        } catch (error) {
            throw error
        }
    }

}

module.exports = new UserEmployeeRepository()

