const express = require('express')
const router = express.Router()
const Blog = require('../models/Blog')
const User = require('../models/Users')
const { isPropsMissing } = require('../utils/helper_functions')
router.get('/blogs', async (request, response) => {
    const blogsList = await Blog.find().populate('creatorUser',{ username: 1, name: 1 } ).exec()
    response.json(blogsList)
})

router.post('/blogs', async (request, response) => {
    let data = request.body
    const user =  await User.find({})
    if (isPropsMissing(data, ['title', 'url'])) {
        return response.status(400).end()
    }
    const blog = new Blog({
        title: data.title,
        author: data.author,
        url: data.url,
        likes: data.likes,
        totalBlogs: data.totalBlogs,
        creatorUser: user[0]._id
    })
    const savedBlog = await blog.save()
    user[0].blogs = user[0].blogs.concat(savedBlog._id)
    await user[0].save()
    response.status(201).json(savedBlog)
})
router.delete('/blogs/:id', async (request, response) => {
    let id = request.params.id
    const result = await Blog.findByIdAndRemove(id)
    result.id === id ? response.status(204).end() : response.status(400).end()
})
router.put('/blogs/:id', async (request, response) => {
    let id = request.params.id
    let changes = request.body
    let updatedBlog = await Blog.findByIdAndUpdate({ _id:id }, changes, { new: true })
    response.status(200).json(updatedBlog)
})
module.exports = router
