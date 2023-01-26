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

  return (
    visibility === false ? (
      <div onClick={toggleVisibility} style={blogStyle} className="onlyTitle">
        {blog.title} <button onClick={toggleVisibility}>View</button>
      </div>
    ) : (
      <div style={blogStyle}>
        <div onClick={toggleVisibility} >Title: {blog.title}<button onClick={toggleVisibility}>Hide</button></div>
        <div>Author: {blog.author}</div>
        <div>Url: {blog.url}</div>
        <div>Likes: {blog.likes}<button onClick={() => addLike(blog)}>Like</button></div>
        <div>Added by: {blog.name}</div>
        {user.name === blog.name &&
          <div>
            <button style={removeStyle} onClick={() => removeBlog(blog)}>Remove</button>You own this entry
          </div>
        }
      </div>
    )
  )
}

export default Blog