const mongoose = require('mongoose')
const uniqueValidator = require('mangoose-unique-validator')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 2
  },
  name: String,
  password: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    //delets hashed password
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User