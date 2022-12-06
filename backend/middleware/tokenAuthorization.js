const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
  try {
    console.log(`# Token verification...`)
    const accessToken = req.header('accessToken')

    if (!accessToken) {
      console.log(`# Not Authorized - No token`)
      return res.json({
        status: 403,
        message: `Not Authorized`
      })
    }

    const payload = jwt.verify(accessToken, process.env.JWT_ACCESS)
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
