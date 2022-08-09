const process = require('process')
const { generateKeyPairSync } = require('node:crypto')
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

// ** If publicKeyEncoding and privateKeyEncoding is specified,
// keyObject.export() is to be called and returns as a generated key pair string, else
// it is return as a KeyObject

const { privateKey:PRIVATE_KEY, publicKey:PUBLIC_KEY } = generateKeyPairSync('ec',{ namedCurve: 'prime256v1' })

// ** To return a string of key pair without using KeyObject.export() function:
// generateKeyPairSync('ec', {
//     namedCurve: 'prime256v1', -- prime256v1 is used as Jose does support this curve
//     publicKeyEncoding: {
//       type: 'spki',
//       format: 'pem'
//     },
//     privateKeyEncoding: {
//       type: 'pkcs8',
//       format: 'pem',
//       cipher: 'aes-256-cbc',
//       passphrase: 'top secret'
//     }
//   })

// ** To export without declaring encoding options under generateKeyPairSync()
// const PRIVATE_KEY = privateKey.export({
//     type:'pkcs8',
//     format: 'pem',
// })
// const PUBLIC_KEY = publicKey.export({
//     type: 'spki'
//     format: 'pem'
// })

// ** To convert back the keys to KeyObject, use
// crypto.createPrivateKey() of crypto.createPublicKey()

// See more at https://nodejs.org/dist/latest-v16.x/docs/api/crypto.html

module.exports = { PORT, MONGODB_URI, PRIVATE_KEY, PUBLIC_KEY }
