const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtAccessVerification = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS)
}

const jwtRefreshVerification = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH)
}

module.exports = {
  jwtAccessVerification,
  jwtRefreshVerification
}
