import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
      setMessage(`Logged in succesfully`)
      setSuccess(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setSuccess(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password);
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }
  
  const handleNewBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const returnedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${title} by ${author} added`)
      setSuccess(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      setMessage('No title or url found')
      setSuccess(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
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
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} success={success}/>
      <p>{user.name} logged in<button onClick={handleLogout}>Logout</button></p>
      <h2>Create new</h2>
      <form onSubmit={handleNewBlog}>
          <div>
            Title
             <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            Author
              <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            Url
              <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
        <button type="submit">create</button>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
        </form>
    </div>
  )
}

export default App