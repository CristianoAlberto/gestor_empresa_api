const positionService = require('./position.repository')

class PositionController {
    async getAllPositions(req, res) {
        try {
            const data = await positionService.getAllPosition()
            res.status(200).json(data)
        } catch (error) {
            res.status(200).json(data)
        }
    }

    async createPosition(req, res) {
        try {
            const dataPosition = req.body
            const data = await positionService.createPosition(dataPosition)
            res.status(201).json(data)
        } catch (error) {
            throw error
        }
    }

    async updatePosition(req, res) {
        try {
            const dataPosition = await positionService.updatePosition({ id: req.params, ...req.body })
            res.status(200).json(dataPosition)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async deletePosition(req, res) {
        try {
            const dataPosition = await positionService.deletePosition({ id: req.params.id })
            res.status(200).json(dataPosition)

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = new PositionController()