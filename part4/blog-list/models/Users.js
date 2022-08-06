const mongoose = require('mongoose')

const schemaUser = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3
    },
    passwordHash: {
        type: String,
        required: true,
        min: 3
    },
    name: String
})

schemaUser.set('toJSON',{
    transform:(document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})
module.exports = mongoose.model('Users',schemaUser)