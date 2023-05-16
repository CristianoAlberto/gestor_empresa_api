const userEmployeeService = require('./userEmployee.repository')

class UserEmployeeController {
    async getAllUsers(req, res) {
        try {
            const dataUsers = await userEmployeeService.getAllUsers();
            res.status(200).json(dataUsers)
        } catch (error) {
            res.status(500).json({ error: 'Erros ao buscar funcionários.' })
        }
    }
}

module.exports = new UserEmployeeController()