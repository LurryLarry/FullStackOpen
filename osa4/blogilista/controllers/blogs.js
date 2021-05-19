const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  console.log('test', token)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  console.log(decodedToken.id)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } // middleware huolehtii errorista

  if (!(body.title && body.url)) {
    return response.status(400).json({
      error: 'no title or url found'
    })
  }
  console.log('jaa')
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  console.log(savedBlog)

  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  console.log(token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log(decodedToken)
  const user = await User.findById(decodedToken.id)
  console.log('täällä', user._id)
  const blog = await Blog.findById(request.params.id)
  console.log('täälläkin', blog)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else if (blog.user.toString() === user._id.toString()) {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    return response.json(deletedBlog.toJSON())
  } else {
    return response.status(401).json(
      { error: 'user doesnt hold access to the blog being deleted' })
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter