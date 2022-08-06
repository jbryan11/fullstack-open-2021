const mongoose = require('mongoose')

const schemaUser = new mongoose.Schema({
    username: String,
    password: String,
    name: String
})

schemaUser.set('toJSON',{
    transform:(document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})
module.exports = mongoose.model('Users',schemaUser)