const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models')
const credentialsValidation = require('../middleware/credentialsValidation')
const loginLimiter = require('../middleware/loginLimiter')
require('dotenv').config()

router.post('/register', credentialsValidation, async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    console.log(`# Registering user '${email}'...`)
    const salt = await bcrypt.genSalt(10)
    const bcryptPassword = await bcrypt.hash(password, salt)
    const [user, created] = await db.user.findOrCreate({
      where: { email: email },
      defaults: {
        firstName: firstName,
        lastName: lastName,
        password: bcryptPassword
      }
    })
    if (created) {
      console.log(`# User '${email}' registered`)
      return res.json({
        status: 200,
        message: `User registered`,
        user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email }
      })
    } else {
      console.log(`# User already exists`)
      return res.json({
        status: 401,
        message: `User already exists`
      })
    }
  } catch(err) {
    console.log(`# Error on /auth/register route`)
    console.error(err.message)
    return res.json({
      status: 500,
      message: `Server Error`
    })
  }
})

router.post('/login', loginLimiter, credentialsValidation, async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(`# Logging in user '${email}'...`)
    const user = await db.user.findOne({
      where: { email: email }
    })
    if (user === null) {
      console.log(`# User doesn't exist`)
      return res.json({
        status: 401,
        message: `Invalid credentials`
      })
    }
    const validPassword = await bcrypt.compare(password, user.dataValues.password)
    if (!validPassword) {
      console.log(`# Invalid credentials`)
      return res.json({
        status: 401,
        message: `Invalid credentials`
      })
    }
    const accessToken = jwt.sign(
      { user_id: user.dataValues.id },
      process.env.JWT_ACCESS,
      { expiresIn: process.env.JWT_EXPIRE }
    )
    console.log(`# Login successful`)
    return res.json({
      status: 200,
      message: `Login successful`,
      accessToken: accessToken
    })
  } catch(err) {
    console.log(`# Error on /auth/login route`)
    console.error(err.message)
    return res.json({
      status: 500,
      message: `Server Error`
    })
  }
})

module.exports = router
