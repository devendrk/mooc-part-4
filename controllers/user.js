const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    if (req.body.password.length > 3) {
      const user = new User({
        username: req.body.username,
        name: req.body.name,
        password: passwordHash
      })
      const savedUser = await user.save()
      res.json(savedUser)
    }
    res.status(400).send('password length must be greater than 3')
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { title: 1, author: 1, url: 1 })
    res.json(users.map(u => u.toJSON()))
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter