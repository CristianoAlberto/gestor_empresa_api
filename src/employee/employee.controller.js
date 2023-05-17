const employeeService = require('./employee.repository')

class EmployeeController {
    async getAllUsers(req, res) {
        try {
            const dataUsers = await employeeService.getAllUsers();
            res.status(200).json(dataUsers)
        } catch (error) {
            res.status(500).json({ error: 'Erros ao buscar funcionários.' })
        }
    }
}

module.exports = new EmployeeController()