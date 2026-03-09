const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB Error:', err))

app.get('/', (req, res) => {
  res.json({ message: 'Xplore API is running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))