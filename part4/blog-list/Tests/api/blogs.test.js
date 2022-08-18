/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const Blogs = require('../../models/Blog')
const Users = require('../../models/Users')
const api = supertest(app)
const blogsList = require('../data')
const userList = require('../users')
const { aggregateObject } = require('../../utils/helper_functions')
const dummyToken = require('../dummyToken')
beforeEach(async () => {
    await Users.deleteMany({})
    await Users.insertMany(userList)
    await Blogs.deleteMany({})
    await Blogs.insertMany(blogsList)
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
    test('Successfully created a new blog post', async () => {
        const { token, uid } = await dummyToken.create()
        const encodedToken =  `Bearer ${token}`
        const newerBlog = {
            title: 'There is no miracle at this place!',
            author: 'Sashara Tachiavanka',
            url: 'http://www.satanic-cult.com/there-is-no-miracle',
            totalBlogs: 25,
            likes: 341,
            creatorUser: uid.toString()
        }
        await api.post('/api/blogs')
            .set('Accept', 'application/json')
            .set('Authorization', encodedToken)
            .send(newerBlog)
            .expect(201)
    })
    test('Successfully added a new blog post', async () => {
        const { token, uid } = await dummyToken.create()
        const newBlog = {
            title: 'Go to Hell!',
            author: 'Sashara Tachiavanka',
            url: 'http://www.satanic-cult.com/go-to-hell',
            likes: 341,
            totalBlogs: 25,
            creatorUser: uid.toString()
        }
        await api.post('/api/blogs')
            .set('Authorization',`Bearer ${token}`)
            .send(newBlog)
        let result = await api.get('/api/blogs')
        expect(result.body).toHaveLength(blogsList.length + 1)
    })
    test('Verified the blog post is saved on the database', async () => {
        const { token, uid } = await dummyToken.create()
        const newBlog = {
            title: 'Go to Hell!',
            author: 'Sashara Tachiavanka',
            url: 'http://www.satanic-cult.com/go-to-hell',
            likes: 341,
            totalBlogs: 25,
            creatorUser: uid.toString()
        }
        const result = await api.post('/api/blogs')
            .set('Authorization',`Bearer ${token}`)
            .send(newBlog)
        let blogContent = aggregateObject(result.body, [
            'title',
            'author',
            'url',
            'likes',
            'totalBlogs',
            'creatorUser'
        ])
        expect(blogContent).toMatchObject(newBlog)
    })
    test('Likes defaults to zero if missing in request', async () => {
        const { token, uid } = await dummyToken.create()
        const newerBlog = {
            title: 'There is no miracle at this place!',
            author: 'Sashara Tachiavanka',
            url: 'http://www.satanic-cult.com/there-is-no-miracle',
            totalBlogs: 25,
            creatorUser: uid.toString()
        }
        const result = await api.post('/api/blogs')
            .set('Authorization',`Bearer ${token}`)
            .send(newerBlog)
        expect(result.body.likes).toBe(0)
    })
    test('Missing URL and Title returns a Bad Request 400', async () => {
        const { token } = await dummyToken.create()
        const errBlog = {
            author: 'Sashara Tachiavanka',
            totalBlogs: 25,
        }
        const result = await api.post('/api/blogs')
            .set('Authorization',`Bearer ${token}`)
            .send(errBlog)
        expect(result.status).toBe(400)
    })
})
describe('HTTP Delete Request', () => {
    test('delete a single blog post', async () => {
        const { token,uid } = await dummyToken.create()
        const newerBlog = {
            title: 'There is no miracle at this place!',
            author: 'Sashara Tachiavanka',
            url: 'http://www.satanic-cult.com/there-is-no-miracle',
            totalBlogs: 25,
            creatorUser: uid.toString()
        }
        await api.post('/api/blogs')
            .set('Authorization',`Bearer ${token}`)
            .send(newerBlog)
        const toDelete = await Blogs.findOne({ creatorUser: uid.toString() }).setOptions({ strict:true })
        await api.delete(`/api/blogs/${toDelete.id}`).set('Authorization',`Bearer ${token}`).expect(204)
    })
})
describe('HTTP PUT Request', () => {
    test('Update a single blog post', async () => {
        const blogChanges = {
            title: 'This is mine! Fvck off!',
            author: 'Mira Tachibanka',
            url: 'http://www.satanic-cult.com/this-is-mine-fvck-off',
            totalBlogs: 252,
            likes: 112,
        }
        let response = await api.get('/api/blogs')
        let toUpdate = response.body[0]

        const { body: updatedBlog } = await api
            .put(`/api/blogs/${toUpdate.id}`)
            .send(blogChanges)

        expect(
            aggregateObject(updatedBlog, ['title', 'author', 'url', 'likes', 'totalBlogs'])
        ).toMatchObject(blogChanges)
    })
})
describe('Token Authentication', () => {
    test('Creating a blog without authorization returns a 401 status', async () => {
        const blog = {
            title: 'There is no miracle at this place!',
            author: 'Sashara Tachiavanka',
            url: 'http://www.satanic-cult.com/there-is-no-miracle',
            totalBlogs: 25,
        }
        await api.post('/api/blogs').send(blog).expect(401)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
