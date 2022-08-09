const express = require('express')
const router = express.Router()
const jwt = require('jose')
const bcrypt = require('bcryptjs')
const userDocument = require('../models/Users')
const { PRIVATE_KEY } = require('../utils/global-vars')


function passwordHashMatch(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash)
}

async function userIsRegistered(login, callback) {
    const userFound = await userDocument.findOne({ username: login.username }).setOptions({ strict: true })
    if (!userFound){
        callback({
            error: 'User not found.'
        })
        return false
    }
    if (!passwordHashMatch(login.password, userFound.passwordHash)){
        callback({
            error: 'Password does not match.'
        })
        return false
    }
    return userFound
}
router.post('/', async (req,res) => {
    const loginData = req.body
    const user = await userIsRegistered(loginData, (err) => {
        return res.status(400).json({ error: err.error })
    })
    let loginToken = {
        username: user.username,
        id: user._id
    }
    // Exports displays private key via console
    // console.log(PRIVATE_KEY.export({ type: 'pkcs8', format: 'pem' }))
    const token = await new jwt.SignJWT(loginToken).setProtectedHeader({ alg:'ES256' }).setExpirationTime('24h').sign(PRIVATE_KEY)
    res.status(200).send({ token, username:user.username, name: user.name })
})

module.exports = router