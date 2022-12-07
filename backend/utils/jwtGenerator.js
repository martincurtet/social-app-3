const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtAccessGenerator = (user_id) => {
  return jwt.sign(
    { user_id: user_id },
    process.env.JWT_ACCESS,
    { expiresIn: process.env.JWT_ACCESS_EXPIRE }
  )
}

const jwtRefreshGenerator = (user_id) => {
  return jwt.sign(
    { user_id: user_id },
    process.env.JWT_REFRESH,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE }
  )
}

module.exports = {
  jwtAccessGenerator,
  jwtRefreshGenerator
}
