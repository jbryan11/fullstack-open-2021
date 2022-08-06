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
const usersRouter = require('./routes/users')
var app = express()
const mongoose = require('mongoose')
const config = require('./utils/global-vars')
// view engine setup
// app.set('views', path.join(__dirname, 'views'))
app.set('views', path.join(path.dirname('views'), 'views'))
app.set('view engine', 'pug')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(path.dirname('views'), 'views')))

mongoose.connect(config.MONGODB_URI).then(() => {
    console.log('Plugged successfully!')
})

app.use('/', indexRouter)
app.use('/api', blogsRouter)
app.use('/api/users', usersRouter)

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    }

    next(err)
})

module.exports = app
