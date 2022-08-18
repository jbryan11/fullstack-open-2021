/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const userDocument = require('../../models/Users')
const api = supertest(app)
const userList = require('../users')
const bcryptjs = require('bcryptjs')

beforeEach(async () => {
    await userDocument.deleteMany({})
    const newUsers = userList.map( (user) => {
        return {
            username:user.username,
            name: user.name,
            passwordHash: bcryptjs.hashSync(user.passwordHash,10)
        }
    })
    await userDocument.insertMany(newUsers)
})
describe('Creating User Account',() => {
    test('Display all users',async () => {
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(userList.length)
    })
    test('Add a new user',async () => {
        const newUser = {
            name: 'Minatozaki Sana',
            username: 'shashashashashasha',
            password: 'sha<3shu'
        }
        await api.post('/api/users').send(newUser)
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(userList.length + 1)
    })
    // test('',async () => {
    // })
})
describe('Validating User Account',() => {
    test('Invalid users are not created',async () => {
        const newUser = {
            name: 'Son Chaeyoung',
            username: 'SC',
            password: 'Ch@3ngB3rryPrinc3ss'
        }
        await api.post('/api/users').send(newUser)
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(userList.length)
    })
    test('Throws error if username does not meet 3 or more characters in length', async () => {
        const newUser = {
            name: 'Son Chaeyoung',
            username: 'SC',
            password: 'Ch@3ngB3rryPrinc3ss'
        }
        await api.post('/api/users').send(newUser).expect(400,{
            error: 'username or password must be at least 3 characters in length.'
        })

    })
    test('Throws error if password does not meet 3 or more characters in length', async () => {
        const newUser = {
            name: 'Son Chaeyoung',
            username: 'Str@uuberryGongjuu',
            password: 'Ch'
        }
        await api.post('/api/users').send(newUser).expect(400,{
            error: 'username or password must be at least 3 characters in length.'
        })
    })
    test('Throws error if username is not unique', async () => {
        const newUser = {
            name: 'Son Chaeyoung',
            username: 'Str@uuberryGongjuu',
            password: 'Ch@3ngB3rryPrinc3ss'
        }
        await api.post('/api/users').send(newUser)
        const response = await api.post('/api/users').send(newUser)
        expect(response.body.error).toBe('username must be unique')

    })
    // test('',async () => {
    // })
})
afterAll(() => {
    mongoose.connection.close()
})