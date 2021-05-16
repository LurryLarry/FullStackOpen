const blog = require('../models/blog')
const user = require('../models/user')

const initialBlogs = [
  {
    title: 'Hoo blogi',
    author: 'Heikki',
    url: 'www.heikkiblog.fi',
    likes: 8
  },
  {
    title: 'Koo blogi',
    author: 'Kalle',
    url: 'www.kalleblog.fi',
    likes: 33
  },
]

const nonExistingId = async () => {
  const blog = new blog({ title: 'Ihka uus blogi' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await user.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}