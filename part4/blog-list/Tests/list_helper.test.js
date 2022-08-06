/* eslint-disable no-undef */
const listHelper = require('../utils/helper_functions')
const blogList = require('./data')
test('Testing the dummy function', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})
describe('Total Likes', () => {
    test('of empty list is zero', () => {
        let result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
    test('when list has only one blog equals the likes of that', () => {
        let result = listHelper.totalLikes([blogList[0]])
        expect(result).toBe(6)
    })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogList)
        expect(result).toBe(286)
    })
})
describe('Favorite Blog', () => {
    test('Most Liked', () => {
        const result = listHelper.favoriteBlog(blogList)
        expect(result).toEqual({
            title: 'The new Van Gogh of the Era of the Industrialization',
            author: 'Lany Shalaman',
            likes: 123,
        })
    })
    test('Most Blogs', () => {
        const result = listHelper.mostBlogs(blogList)
        expect(result).toEqual({
            author: 'Pedro Salazar',
            blogs: 538,
        })
    })
    test('Most Likes', () => {
        const result = listHelper.mostLikes(blogList)
        expect(result).toEqual({
            author: 'Lany Shalaman',
            likes: 123
        })
    })
})
