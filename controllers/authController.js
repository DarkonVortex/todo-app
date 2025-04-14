const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// Register new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash pasword before saving
    const salt = await bcrypt.genSalt(10) // Adjust 10 to control hashing complexity
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user and save to db
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    await newUser.save()

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })

    // Save token in a cookie
    res.cookie('token', token, { httpOnly: true, secure: false })

    // Send token in the response
    res.status(201).json({
      message: 'User registered successfully',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Login new user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Credentials incorrect' })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })
    res.cookie('token', token, { httpOnly: true, secure: false })
    res.json({ message: 'logged with success', user: { id: user._id, email: user.email, username: user.username } })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie('token')
    res.json({ message: 'Logged out successfully' })    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
