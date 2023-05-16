const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate()
    .then(() => {
        console.log('Conexão estabelecida com sucesso!')
    })
    .catch((err) => {
        console.error('Erro ao conectar-se ao banco de dados:', err)
    })

module.exports = sequelize