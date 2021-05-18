const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const blog = require('../models/blog')
const User = require('../models/user')


describe('some blogs already on db', () => {
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
    expect(titles).toContainEqual(
      'Kalle'
    )
  })

  test('a valid blog can be added', async () => {
    const login = await api.post('/api/login').send({ username: "lurry", password: "Kekerosperg" })
    const token = login.body.token
    const newBlog = {
      title: 'Hassu Blogi',
      author: 'HH',
      url: 'www.hassublog.fi',
      likes: 99
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(
      'Hassu Blogi'
    )
  })

  test('no likes shows as 0', async () => {
    const login = await api.post('/api/login').send({ username: "lurry", password: "Kekerosperg" })
    const token = login.body.token
    const newBlog =  {
      title: 'Ei kiva',
      author: 'Huono kirjoittaja',
      url: 'www.eikiva.fi'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length-1].likes).toEqual(0)
  })

  test('blog has id field (not _id)', async () => {
    const response = await helper.blogsInDb()
    console.log(response[0].id)
    expect(response[0].id).toBeDefined()
  })

  test('blog has no title or url returns correct error', async () => {
    const login = await api.post('/api/login').send({ username: "lurry", password: "Kekerosperg" })
    const token = login.body.token
    const newBlog =  {
      author: 'Huono kirjoittaja',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
    const login = await api.post('/api/login').send({ username: "lurry", password: "Kekerosperg" })
    const token = login.body.token
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username or password < 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('must be over')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'lurry',
      name: 'Lari Vesterinen',
      password: 'Kekerosperg',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})