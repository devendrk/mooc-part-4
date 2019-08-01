const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogRouter = require('./controllers/blog')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const cors = require('cors')
app.use(bodyParser.json())
app.use(express.json())
app.use(blogRouter)

const port = process.env.PORT
app.listen(port, () => console.log(`Server running on port ${port}`))