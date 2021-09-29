/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const Blogs = require('../../models/Blog')
const api = supertest(app)
const blogsList = require('../data')
const { aggregateObject } = require('../../utils/helper_functions')
beforeEach(async () => {
    await Blogs.deleteMany({})
    blogsList.forEach(async (blog) => {
        let blogObj = new Blogs(blog)
        await blogObj.save()
        //console.log("saved", blog.title);
    })
})
describe('HTTP GET Request', () => {
    test('GET list of blogs to /api/blogs', async () => {
        const result = await api.get('/api/blogs')
        expect(result.body).toHaveLength(blogsList.length)
    })
    test('GET /api/blogs returns a content-type of application/json', async () => {
        await api.get('/api/blogs').expect('Content-Type', /application\/json/)
    })
    test('Each blog has its unique id defined', async () => {
        const result = await api.get('/api/blogs')
        let list = result.body
        list.forEach((blog) => {
            expect(blog.id).toBeDefined()
        })
    })
})

describe('HTTP POST Request', () => {
    const newBlog = {
        title: 'Go to Hell!',
        author: 'Sashara Tachiavanka',
        url: 'http://www.satanic-cult.com/go-to-hell',
        likes: 341,
        blogs: 25,
    }
    const newerBlog = {
        title: 'There is no miracle at this place!',
        author: 'Sashara Tachiavanka',
        url: 'http://www.satanic-cult.com/there-is-no-miracle',
        blogs: 25,
    }
    const errBlog = {
        author: 'Sashara Tachiavanka',
        blogs: 25,
    }
    test('Successfully created a new blog post', async () => {
        const result = await api.post('/api/blogs').send(newBlog)
        // console.log(result.body);
        expect(result.status).toBe(201)
    })
    test('Successfully added a new blog post', async () => {
        await api.post('/api/blogs').send(newBlog)
        let result = await api.get('/api/blogs')
        expect(result.body).toHaveLength(blogsList.length + 1)
    })
    test('Verified the blog post is saved on the database', async () => {
        const result = await api.post('/api/blogs').send(newBlog)
        let blogContent = aggregateObject(result.body, [
            'title',
            'author',
            'url',
            'likes',
            'blogs',
        ])
        expect(blogContent).toMatchObject(newBlog)
    })
    test('Likes defaults to zero if missing in request', async () => {
        const result = await api.post('/api/blogs').send(newerBlog)
        expect(result.body.likes).toBe(0)
    })
    test('Missing URL and Title returns a Bad Request 400', async () => {
        const result = await api.post('/api/blogs').send(errBlog)
        expect(result.status).toBe(400)
    })
})
describe('HTTP Delete Request', () => {
    test('delete a single blog post', async () => {
        let response = await api.get('/api/blogs')
        let toDelete = response.body[0]
        await api.delete(`/api/blogs/${toDelete.id}`).expect(204)
    })
})
describe('HTTP PUT Request', () => {
    test('Update a single blog post', async () => {
        const blogChanges = {
            title: 'This is mine! Fvck off!',
            author: 'Mira Tachibanka',
            url: 'http://www.satanic-cult.com/this-is-mine-fvck-off',
            blogs: 252,
            likes: 112,
        }
        let response = await api.get('/api/blogs')
        let toUpdate = response.body[0]

        const { body: updatedBlog } = await api
            .put(`/api/blogs/${toUpdate.id}`)
            .send(blogChanges)

        expect(
            aggregateObject(updatedBlog, ['title', 'author', 'url', 'likes', 'blogs'])
        ).toMatchObject(blogChanges)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
