const express = require('express')
const cookieParser = require('cookie-parser')
const corsMiddleware = require('./middleware/corsMiddleware')
const connectDB = require('./config/db')
const startServer = require('./config/server')
const authRoutes = require('./routes/authRoutes')
const listingRoutes = require('./routes/listingRoutes')
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
app.use('/api/listings', listingRoutes)

startServer(app)