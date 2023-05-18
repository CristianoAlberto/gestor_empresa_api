const userService = require('./user.repository')

class UserController {

    async getAllUsers(req, res) {
        try {
            const dataUser = await userService.getAllUsers()
            res.status(200).json(dataUser)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async createUser(req, res) {
        try {
            const dataUser = await userService.createUser({ ...req.body })
            res.status(201).json(dataUser)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async updateUser(req, res) {
        try {
            const dataUser = await userService.updateUser({ id: req.params.id, ...req.body })
            res.status(200).json(dataUser)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async deleteUser(req, res) {
        try {
            const dataUser = await userService.deleteUser({ id: req.params.id })
            res.status(200).json(dataUser)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

}

module.exports = new UserController()