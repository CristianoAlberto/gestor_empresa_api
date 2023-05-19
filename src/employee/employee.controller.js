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

    async createEmployee(req, res) {
        try {
            const data = await employeeService.createEmployee({ ...req.body })
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async updateEmployee(req, res) {
        try {
            const data = await employeeService.updateEmployee({ id: req.params.id, ...req.body })
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