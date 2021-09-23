
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
var indexRouter = require('./routes/index')
var infoRouter = require('./routes/info')
var apiRouter = require('./routes/api')
const morgan = require('morgan')
var app = express()
// view engine setup
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//Morgan Configuration
morgan.token('post-body',function getBody(req) {
  if (req.method === 'POST') return JSON.stringify(req.body)

})
app.use(logger(':method :url :status :response-time ms - :res[content-length] :post-body'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'build')))

app.use('/', indexRouter)
app.use('/info', infoRouter)
app.use('/api', apiRouter)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {

  console.error(err.name)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
})

module.exports = app
