const mongoose = require('mongoose')

const userSchema = mongoose.schema({
  username: String,
  name: String,
  password: String,
  blogs: [
    {
      type: mongoose.schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

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