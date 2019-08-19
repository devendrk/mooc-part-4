const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      username: req.body.username,
      name: req.body.name,
      password: passwordHash
    })
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (error) {
    next(error)
  }

})

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (error) {
    next(error)
  }
})



module.exports = usersRouter