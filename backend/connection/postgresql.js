const Sequelize = require('sequelize')
const config = require('../config/config.json').dev

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging
  }
)

try {
  sequelize.authenticate()
  console.log(`# Database connection successful`)
} catch(err) {
  console.log(`# Database connection error`)
  console.error(err.message)
}

module.exports = sequelize
