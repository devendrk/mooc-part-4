const express = require('express')
const Blog = require('../models/blog')
const router = new express.Router()

router.post('/api/blogs', async (req, res) => {
  const blog = new Blog(req.body)
  try {
    await blog.save()
    res.status(202).send(blog)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({})
    res.send(blogs)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router