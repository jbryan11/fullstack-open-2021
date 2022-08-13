const { env,cwd } = require('process')
const { createPrivateKey, createPublicKey } = require('crypto')
const { readFileSync } = require('fs')
const { resolve } = require('path')

const privateKeyFile = resolve(`${cwd()}`,'./private_key.pem')
const publicKeyFile = resolve(`${cwd()}`,'./public_key.pem')

const PASSPHRASE = env.HASH_PASSPHRASE
const PRIVATE_KEY = createPrivateKey({
    key: readFileSync(privateKeyFile,'utf-8'),
    format: 'pem',
    type: 'pkcs8',
    passphrase: PASSPHRASE,
    encoding: 'utf-8'
})
const PUBLIC_KEY = createPublicKey({
    key: readFileSync(publicKeyFile,'utf-8'),
    format: 'pem',
    type: 'spki',
    encoding: 'utf-8'
})

module.exports= {
    PRIVATE_KEY,
    PUBLIC_KEY,
    PASSPHRASE
}