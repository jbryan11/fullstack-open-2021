const { generateKeyPairSync, createHash } = require('crypto')
const { readFileSync } = require('fs')
const { cwd } = require('process')
const password = readFileSync('password.txt',  { encoding: 'utf-8' })
const hashPassword = createHash('sha256').update(password,'utf-8').digest('hex')

const { privateKey, publicKey } = generateKeyPairSync('ec',{
    namedCurve: 'prime256v1',
    privateKeyEncoding:{
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: hashPassword
    },
    publicKeyEncoding:{
        type: 'spki',
        format: 'pem'
    }
})
// ** If publicKeyEncoding and privateKeyEncoding is specified,
// keyObject.export() is to be called and returns as a generated key pair string, else
// it is return as a KeyObject

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
console.log('Private Key:', privateKey)
console.log('Public Key:', publicKey)
console.log('Passphrase Hash:', hashPassword)
console.log(cwd())