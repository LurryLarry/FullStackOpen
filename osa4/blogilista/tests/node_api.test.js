const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const blog = require('../models/blog')
const { test, expect } = require('@jest/globals')

beforeEach(async () => {
  await blog.deleteMany({})
  let blogObject = new blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new blog(helper.initialBlogs[1])
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
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.author)
  expect(titles).toContain(
    'Kalle'
  )
})

test('a valid blog can be added ', async () => {
  const newBlog =  {
    title: 'Hassu Blogi',
    author: 'HH',
    url: 'www.hassublog.fi',
    likes: 99
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  console.log(blogsAtEnd)
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain(
    'Hassu Blogi'
  )
})

test('delete by id works', async () => {
  const currentBlogs = await helper.blogsInDb()
  console.log(currentBlogs)
  const blogToRemoveId = currentBlogs[currentBlogs.length - 1].id
  console.log(blogToRemoveId)
  await api
    .delete(`/api/blogs/${blogToRemoveId}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  console.log(blogsAtEnd)
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const ids = blogsAtEnd.map(blog => blog.id)

  expect(ids).not.toContain(blogToRemoveId)
})

test('update specific blog likes', async () => {
  const currentBlogs = await helper.blogsInDb()
  const blogToUpdate = currentBlogs[0]
  console.log(blogToUpdate)

  blogToUpdate.likes = 1337

  console.log(blogToUpdate)
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

  const likes = blogsAtEnd.map(blog => blog.likes)
  expect(likes).toContain(blogToUpdate.likes)
})

afterAll(() => {
  mongoose.connection.close()
})