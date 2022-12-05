'use strict'
const express = require('express')
const db = require('./models')
const config = require('./config/config.json').dev
require('dotenv').config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

try {
  db.sequelize.sync({ force: true })
  console.log(`# Database synchronization successful`)
} catch(err) {
  console.log(`# Database cannot synchronize`)
  console.error(err.message)
}

app.listen(PORT, () => {
  console.log(`# Server running on port ${PORT}`)
})
