const dummy = (blogs) => {
  if (blogs) {
    return 1
  }
}


const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const mostLikes = (blogs) => {
  const maxLikes = Math.max(...blogs.map(item => item.likes), 0)
  const mostLikedBlog = blogs.find(blog => blog.likes === maxLikes)
  return mostLikedBlog
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes
}