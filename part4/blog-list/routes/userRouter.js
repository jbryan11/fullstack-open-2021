var express = require('express')
const bcryptjs = require('bcryptjs')
const userDocument = require('../models/Users')
var router = express.Router()

function  isMinimumCharacterReached(username, password) {
    return username.length >= 3 && password.length >= 3
}
function hashPassword(password) {
    return bcryptjs.hashSync(password, 10)
}
async function isUsernameUnique(username){
    let userfound = await userDocument.findOne({ username: username }).setOptions({ strict:true })
    return userfound
}
/**
 * Displays all the users
 * @returns {array[Object]} - List of users
 */

router.get('/', async (req, res) => {
    const usersList = await userDocument.find().populate('blogs', { url: 1, title: 1, author: 1 }).exec()
    res.json(usersList)
})
/**
 *Insert New User to Database
 * @param {string} name - the name of the user
 * @param {string} username - the username used by the user.
 * @param {string} password - password for the user account.
 * @returns {number} - Response Status
 */
router.post('/', async (req,res) => {
    let data = req.body
    if (!isMinimumCharacterReached(data.username,data.password)) {
        return res.status(400).json({
            error:'username or password must be at least 3 characters in length.'
        })
    }
    if (await isUsernameUnique(data.username)) {
        return res.status(400).json({
            error:'username must be unique'
        })
    }
    const newUser = new userDocument({
        username: data.username,
        passwordHash: hashPassword(data.password),
        name: data.name
    })
    const result = await newUser.save()
    res.status(201).json(result)
})
module.exports = router
