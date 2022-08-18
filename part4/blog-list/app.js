require('dotenv').config()
require('express-async-errors')

// var createError = require("http-errors");
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
var indexRouter = require('./routes/index')
const blogsRouter = require('./routes/blogsRouter')
const usersRouter = require('./routes/userRouter')
const loginRouter = require('./routes/loginRouter')
const mongoose = require('mongoose')
const mongodb = require('./utils/mongodb_constants')
const { passTokenToRequest } = require('./middlewares/tokenHandler')
const errorHandler = require('./middlewares/errorHandler')
var app = express()
// view engine setup
// app.set('views', path.join(__dirname, 'views'))
app.set('views', path.join(path.dirname('views'), 'views'))
app.set('view engine', 'pug')

app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(path.dirname('views'), 'views')))

mongoose.connect(mongodb.MONGODB_URI).then(() => {
    console.log('Plugged successfully!')
})

app.use(passTokenToRequest)
// Spcific Routes
app.use('/', indexRouter)
app.use('/api', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
//Error Handler
app.use(errorHandler)


module.exports = app
