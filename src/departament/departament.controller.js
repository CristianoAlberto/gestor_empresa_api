const departamentService = require('./departament.repository')

class DepartamentController {
    async getAllDepartament(req, res) {
        try {
            const data = await departamentService.getAllDepartament()
            res.status(200).json(data)
        } catch (error) {
            res.status(200).json(data)
        }
    }

    async createDepartament(req, res) {
        try {
            const dataDepartament = req.body
            const data = await departamentService.createDepartament(dataDepartament)
            res.status(201).json(data)
        } catch (error) {
            throw error
        }
    }

    async updateDepartament(req, res) {
        try {
            const dataDepartament = await departamentService.updateDepartament({ id: req.params, ...req.body })
            res.status(200).json(dataDepartament)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async deleteDepartament(req, res) {
        try {
            const dataDepartament = await departamentService.deleteDepartament({ id: req.params.id })
            res.status(200).json(dataDepartament)

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = new DepartamentController()