module.exports = (req, res, next) => {
  try {
    console.log(`# Credentials Validation in progress...`)
    const { firstName, lastName, email, password } = req.body

    // empty parameters
    if (email === '' || password === '') {
      console.log(`# Empty parameter(s)`)
      return res.json({
        status: 400,
        message: `Missing parameter(s)`
      })
    }

    // special characters in name
    if (!/^[A-Za-z0-9]*$/.test(firstName) || !/^[A-Za-z0-9]*$/.test(lastName)) {
      console.log(`# Forbidden characters in name`)
      return res.json({
        status: 400,
        message: `Forbidden characters`,
        detail: `First and last names can only contain alphanumerical characters`
      })
    }

    // email format
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      console.log(`# Wrong email format`)
      return res.json({
        status: 400,
        message: `Wrong email format`
      })
    }

    // password requirements
    if (req.path == '/register' && !/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_]).{8,}$/.test(password)) {
      console.log(`# Password not strong enough`)
      return res.json({
        status: 400,
        message: `Password requirements not met`,
        details: `At least eight characters long, no whitespace, at least one uppercase letter, at least one lowercase letter, at least one number, at least one special character (~\`!@#$%^&*()--+={}[]|\\:;"'<>,.?/_)`
      })
    }

    console.log(`# Credentials Validation done`)
    next()
  } catch(err) {
    console.log(`# Credentials Validation Error`)
    console.error(err.message)
    return res.json({
      status: 500,
      message: `Server Error`
    })
  }
}
