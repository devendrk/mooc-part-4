const router = require('express').Router()
const Blog = require('../models/blog')

router.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  try {
    await blog.save()
    res.status(202).send(blog)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({})
    res.send(blogs)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.send(blog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

//update blog
router.put('/:id', async (req, res, next) => {
  try {
    const body = req.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
    }
    const blogUpdate = await Blog.findOneAndUpdate(req.params.id, blog, { new: true })
    res.send(blogUpdate)
  } catch (error) {
    next(error)
  }
})

//delete blog
router.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router