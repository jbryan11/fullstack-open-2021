const express = require('express')
const router = express.Router()
const Blog = require('../models/Blog')
const User = require('../models/Users')
const { isPropsMissing } = require('../utils/helper_functions')
const { passUserToRequest } = require('../middlewares/tokenHandler')
router.get('/blogs', async (request, response) => {
    const blogsList = await Blog.find().populate('creatorUser',{ username: 1, name: 1 } ).exec()
    response.json(blogsList)
})
router.post('/blogs',passUserToRequest, async (request, response) => {
    let data = request.body
    let loginData = request.user
    const user =  await User.findById(loginData.id)
    if (isPropsMissing(data, ['title', 'url'])) {
        return response.status(400).end()
    }
    const blog = new Blog({
        title: data.title,
        author: data.author,
        url: data.url,
        likes: data.likes,
        totalBlogs: data.totalBlogs,
        creatorUser: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})
router.delete('/blogs/:id',passUserToRequest, async (request, response) => {
    let id = request.params.id
    let loginData = request.user
    const blogData = await Blog.findById(id)
    if (!blogData.id){
        return response.status(400).end()
    }
    if(loginData.id !== blogData.creatorUser.toString()){
        return response.status(401).json({ error: 'User not permitted' })
    }
    await Blog.findByIdAndRemove(blogData.id)
    response.status(204).end()
})
router.put('/blogs/:id', async (request, response) => {
    let id = request.params.id
    let changes = request.body
    let updatedBlog = await Blog.findByIdAndUpdate({ _id:id }, changes, { new: true })
    response.status(200).json(updatedBlog)
})
module.exports = router
