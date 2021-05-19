import { React, useState } from 'react'

const Blog = ({ blog }) => {
  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    padding: 5,
    marginBottom: 5,
  }

  const toggleVisibility = (event) => {
    setVisibility(!visibility)
  }
  
  if (visibility === false) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={toggleVisibility}>View</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>{blog.title}<button onClick={toggleVisibility}>Hide</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes}<button>Like</button></div>
        <div>{blog.author}</div>
      </div>
    )
  }
}

export default Blog