const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1) // Exit the process if there's an error
  }
}

module.exports = connectDB
