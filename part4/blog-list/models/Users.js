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
    name: String,
    blogs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blogs'
        }
    ]
})

schemaUser.set('toJSON',{
    transform:(document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})
const Users = mongoose.model('Users',schemaUser, 'users')
module.exports = Users