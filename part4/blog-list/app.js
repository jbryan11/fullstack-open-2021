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
var app = express()
const mongoose = require('mongoose')
const mongodb = require('./utils/mongodb_constants')
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

mongoose.connect(mongodb.MONGODB_URI).then(() => {
    console.log('Plugged successfully!')
})

app.use(function(req,res,next){
    if (req.headers.authorization && req.headers.authorization.toLowerCase().startsWith('bearer ')){
        req.token = req.headers.authorization.substring(7)
    }
    next()
})
app.use('/', indexRouter)
app.use('/api', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	next(createError(404));
// });

// Extracts Session Token

// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    }else if (err.name === 'JWSSignatureVerificationFailed') {
        return res.status(401).json({
            error: 'invalid token'
        })
    }else if (err.name === 'JWTExpired') {
        return res.status(401).json({
            error: 'Session Token expired'
        })
    }

    next(err)
})

module.exports = app
