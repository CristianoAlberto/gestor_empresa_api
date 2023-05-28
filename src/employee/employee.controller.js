const employeeService = require('./employee.repository')

class EmployeeController {
    async getAllEmployees(req, res) {
        try {
            const data = await employeeService.getAllEmployees();
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async getEmployeeById(req, res) {
        try {
            const data = await employeeService.getEmployeeById({ id: req.params.id })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: erro.message })
        }
    }

    async createEmployee(req, res) {
        try {
            const data = await employeeService.createEmployee({ ...req.body, picture: req.file })
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async updateEmployee(req, res) {
        try {
            const data = await employeeService.updateEmployee({ id: req.params.id, ...req.body, picture: req.file })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async deleteEmployee(req, res) {
        try {
            const data = await employeeService.deleteEmployee({ id: req.params.id, userId: req.query.id, ...req.body })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = new EmployeeController()