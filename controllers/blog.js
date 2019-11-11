const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/', async (req, res, next) => {
  const body = req.body
  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id

  })
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
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