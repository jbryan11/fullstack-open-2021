const express = require('express')
const router = express.Router()
const Blog = require('../models/Blog')
const { isPropsMissing } = require('../utils/helper_functions')
router.get('/blogs', async (request, response) => {
    const blogsList = await Blog.find({})
    response.json(blogsList)
})

router.post('/blogs', async (request, response) => {
    let data = request.body
    if (isPropsMissing(data, ['title', 'url'])) {
        return response.status(400).end()
    }
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
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
