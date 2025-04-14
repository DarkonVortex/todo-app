const jwt = require('jsonwebtoken')

exports.authMiddleware = (req, res, next) => {

  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Add user data to request
    req.user = decoded

    // Move to next middleware
    next()
  } catch (error) {
    console.error('Token verification failed', error)
    res.status(401).json({ message: 'Token is not valid' })
  }
}
