const process = require('process')

//MONGODB Variables
const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PASS = process.env.MONGODB_PASS
const MONGODB_DATABASE =
	process.env.NODE_ENV === 'test'
	    ? process.env.MONGODB_DATABASE_TEST
	    : process.env.MONGODB_DATABASE
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER

const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_CLUSTER}.9jnqv.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`

const PORT = process.env.PORT

module.exports = { PORT, MONGODB_URI }
