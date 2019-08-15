const app = require('./app')
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

<<<<<<< HEAD
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// const cors = require('cors')
app.use(bodyParser.json())
app.use(express.json())
app.use(blogRouter)

const port = process.env.PORT
app.listen(port, () => console.log(`Server running on port ${port}`))
=======
server.listen(config.PORT, () => console.log(`server is running on port ${config.PORT}`))
>>>>>>> blogList-step-1-2
