import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setMessage('Logged in succesfully')
      setSuccess(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage(error.response.data.error)
      setSuccess(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setSuccess(true)
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage(error.response.data.error)
      setSuccess(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addLike = async (blog) => {
    const blogCopy = {
      likes: blog.likes + 1,
    }
    try {
      const returnedBlog = await blogService.update(blog.id, blogCopy)
      setBlogs(blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog))
      setMessage(`You liked ${returnedBlog.title} by ${returnedBlog.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setSuccess(true)
    } catch (error) {
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setSuccess(false)
    }
  }

  const removeBlog = async (blog) => {
    const result = window.confirm(`Remove ${blog.title}?`)
    if (result === true) {
      try {
        const removedBlog = await blogService.removeBlog(blog.id)
        setBlogs([...blogs].filter(b => b.id !== removedBlog.id))
        setMessage(`Removed ${blog.title}`)
        setSuccess(true)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (error) {
        setMessage(error.response.data.error)
        setSuccess(false)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1) // sort blogs by likes

  return (
    user === null ? (
      <div>
        <h2>Login to application</h2>
        <Notification message={message} success={success} />
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    ) : (
      <div>
        <h2>Blogs</h2>
        <Notification message={message} success={success} />
        <p>{user.name} logged in<button onClick={handleLogout}>Logout</button></p>
        <h2>Create new</h2>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}
          />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} user={user} removeBlog={removeBlog} />
        )}
      </div>
    )
  )
}


export default App