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

test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('all blogs unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body[0]
  expect(contents.id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'React is important',
    author: 'Prof',
    url: 'react.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain(
    'React is important'
  )

})

afterAll(async () => {
  await mongoose.connection.close()
})