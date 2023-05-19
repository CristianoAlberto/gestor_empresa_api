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
            const data = await departamentService.createDepartament({ ...req.body })
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ error: error.message })
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
            const dataDepartament = await departamentService.deleteDepartament({ id: req.params.id, userId: req.query.id, ...req.body })
            res.status(200).json(dataDepartament)

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = new DepartamentController()