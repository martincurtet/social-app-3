const { jwtAccessVerification, jwtRefreshVerification } = require('../utils/jwtVerification')
require('dotenv').config()

module.exports = async (req, res, next) => {
  try {
    console.log(`# Token verification...`)
    const accessToken = req.header('accessToken')
    const refreshToken = req.header('refreshToken')

    if (!refreshToken && !accessToken) {
      console.log(`# Not Authorized - No token`)
      return res.json({
        status: 403,
        message: `Not Authorized`
      })
    }

    let payload = {}
    if (refreshToken) {
      payload = jwtRefreshVerification(refreshToken)
    } else if (accessToken) {
      payload = jwtAccessVerification(accessToken)
    }

    // what if user is accessing a protected route and only gives a refresh token?
    req.user_id = payload.user_id
    console.log(`# Valid token`)
    next()
  } catch(err) {
    return res.json({
      status: 403,
      message: `Not Authorized`
    })
  }
}
