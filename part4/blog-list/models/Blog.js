const mongoose = require('mongoose')

const schemaBlog = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {
        type:Number,
        default: 0,
    },
    totalBlogs: Number,
    creatorUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
})
schemaBlog.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})


const Blogs = mongoose.model('Blogs', schemaBlog)
module.exports = Blogs
