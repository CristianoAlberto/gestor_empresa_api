require("dotenv").config({ path: '.env' })
const express = require('express')
const cors = require('cors')
const app = express()
const database = require('./database')
const employeeRoute = require('./employee/employee.router')
const departamentRoute = require('./departament/departament.router')
const positionRoute = require('./position/position.router')


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta: ${process.env.PORT}`);
})

app.use('/employee', employeeRoute)
app.use('/departament', departamentRoute)
app.use('/position', positionRoute)