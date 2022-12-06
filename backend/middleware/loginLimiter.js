const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { message: `Too many login attemps from this IP address, please try again after a minute` },
  handler: (req, res) => {
    console.log(`# Too many login requests`)
    return res.json({
      status: 500,
      message: `Server Error`
    })
  },
  standardHeaders: true,
  legacyHeaders: true
})

module.exports = loginLimiter
