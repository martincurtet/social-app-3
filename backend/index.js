const express = require('express')
const sequelize = require('./connection/postgresql')
require('dotenv').config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
  console.log(`# Server running on port ${PORT}`)
})
