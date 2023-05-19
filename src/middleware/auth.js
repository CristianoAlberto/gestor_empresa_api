const jwt = require('jsonwebtoken');
const config = require('../utils/config')


module.exports = {
    generateToken: async (data) => {
        return jwt.sign({ id: data }, config.secretKey, { expiresIn: config.expiresIn })
    },

    decodeToken: async (token) => {
        let data = await jwt.verify(token, config.secretKey)
        return data
    },

    authorize: async (req, res, next) => {
        let token = req.body.token || req.query.token || req.headers['x-acess-token']

        if (!token) {
            res.status(401).json({ message: 'Acesso negado' })
        } else {
            jwt.verify(token, config.secretKey, (error, decode) => {
                if (error) {
                    res.status(401).json({ message: 'Token invalido' })
                } else {
                    next();
                }
            })
        }

    }
}