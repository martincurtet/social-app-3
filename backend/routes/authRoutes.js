const router = require('express').Router()
const bcrypt = require('bcrypt')
const db = require('../models')

router.post('/register', async (req, res) => {
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

module.exports = router
