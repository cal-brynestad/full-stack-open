const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'cal',
    url: 'match.com',
    likes: 4
  },
  {
    title: 'leetcode is easy',
    author: 'Marc',
    url: 'leetcode.com',
    likes: 1000
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})


test('a specific blog is within the returned notes', async () => {
  const response = await api.get('/api/blogs')


  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'leetcode is easy'
  )
})

afterAll(async () => {
  await mongoose.connection.close()
})