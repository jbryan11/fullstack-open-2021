var express = require('express')
const bcryptjs = require('bcryptjs')
const userDocument = require('../models/Users')
var router = express.Router()

/**
 * Displays all the users
 * @returns {array[JSON]} - List of users
 */

router.get('/', async (req, res) => {
    const usersList = await userDocument.find({})
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
    let saltRounds = 10
    let hashPassword = await bcryptjs.hash(data.password,saltRounds)

    const newUser = new userDocument({
        username: data.username,
        password: hashPassword,
        name: data.name
    })

    const result = newUser.save()
    res.status(201).json(result)

})
module.exports = router
