const mongoose = require('mongoose')

// create Schema model
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('blog', blogSchema)

module.exports = Blog