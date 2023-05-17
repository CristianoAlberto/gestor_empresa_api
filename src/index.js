require("dotenv").config({ path: '.env' })
const express = require('express')
const cors = require('cors')
const app = express()
const database = require('./database')
const employeeRoute = require('./user/userEmployee/employee.router')
const departamentRoute = require('./departament/departament.router')





app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta: ${process.env.PORT}`);
})

app.use('/employee', employeeRoute)
app.use('/departament', departamentRoute)