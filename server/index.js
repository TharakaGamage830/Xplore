const express = require('express')
const cookieParser = require('cookie-parser')
const corsMiddleware = require('./middleware/corsMiddleware')
const connectDB = require('./config/db')
const startServer = require('./config/server')
const authRoutes = require('./routes/authRoutes')
require('dotenv').config()

const app = express()

// Middleware
app.use(corsMiddleware)
app.use(express.json())
app.use(cookieParser())

// Database
connectDB()

// Routes
app.use('/api/auth', authRoutes)


startServer(app)