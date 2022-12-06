'use strict'
const express = require('express')
const cors = require('cors')
const db = require('./models')
require('dotenv').config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

try {
  db.sequelize.sync({ alter: true })
  console.log(`# Database synchronization successful`)
} catch(err) {
  console.log(`# Database cannot synchronize`)
  console.error(err.message)
}

app.use('/auth', require('./routes/authRoutes'))

app.listen(PORT, () => {
  console.log(`# Server running on port ${PORT}`)
})
