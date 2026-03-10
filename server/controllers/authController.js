const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { generateToken, sendTokenCookie } = require('../utils/jwt')

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Use utility functions
    const token = generateToken(user)
    sendTokenCookie(res, token)

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

exports.logout = async (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Logged out successfully' })
}

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}