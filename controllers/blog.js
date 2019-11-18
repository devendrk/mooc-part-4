const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

router.post('/', async (req, res, next) => {
  const body = req.body

  const token = getTokenFrom(req)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    console.log( 'decodeToken',decodedToken)
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(await savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1
    })
    res.json(blogs.map(blog => blog.toJSON()))
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.json(blog.toJSON)
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
      url: body.url
    }
    const blogUpdate = await Blog.findOneAndUpdate(req.params.id, blog, {
      new: true
    })
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
