const Blog = require('../models/blog')

const initialBlog = [
  {
    title: ' updated second blog',
    url: 'second@blog.com',
    likes: 4,
    author: 'Nishan'
  },
  {
    title: 'third blog',
    author: 'dev3',
    url: 'third.com',
    likes: 5
  },
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
module.exports = {
  initialBlog, blogsInDB
}