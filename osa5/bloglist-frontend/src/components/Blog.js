import { React, useState } from 'react'

const Blog = ({ blog, addLike, user, removeBlog }) => {
  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    padding: 5,
    marginBottom: 5,
  }

  const removeStyle = {
    backgroundColor: '#FF7F50'
  }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const removeButton = () => {
    if (user.username === blog.user.username) {
      return (
        <div>
          <button style={removeStyle} onClick={() => removeBlog(blog)}>Remove</button>You own this entry
        </div>
      )
    }
  }

  if (visibility === false) {
    return (
      <div onClick={toggleVisibility} style={blogStyle} className="onlyTitle">
        {blog.title} <button onClick={toggleVisibility}>View</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div onClick={toggleVisibility} >{blog.title} {blog.author}<button onClick={toggleVisibility}>Hide</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes}<button onClick={() => addLike(blog)}>Like</button></div>
        <div>{blog.user.name}</div>
        {removeButton()}
      </div>
    )
  }
}

export default Blog