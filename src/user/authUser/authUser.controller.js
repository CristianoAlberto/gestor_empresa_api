const authUserService = require('./authUser.repository')

class AuthUserController {

    async userSignUp(req, res) {
        try {
            const authUserData = await authUserService.userSignUp({ ...req.body })
            res.status(200).json(authUserData)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async userLogOut(req, res) {
        try {
            const authUserData = await authUserService.userLogOut()
            res.status(200).json(authUserData)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new AuthUserController()
