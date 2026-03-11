const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

const isProduction = process.env.NODE_ENV === 'production'

const sendTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction
  })
}

module.exports = { generateToken, sendTokenCookie }