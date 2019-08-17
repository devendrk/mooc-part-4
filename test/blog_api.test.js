const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})


  for (let blog of helper.initialBlog) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

})

test('blogs are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('content-type', /application\/json/)
})

test('all blogs are returned', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body.length).toBe(helper.initialBlog.length)
})

test('a valid blog is added', async () => {
  const newBlog = {
    title: 'test blog shoul appear wile test runs',
    url: 'test@blog.com',
    likes: 4,
    author: 'testman'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd.length).toBe(helper.initialBlog.length + 1)
  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'test blog shoul appear wile test runs'
  )


})
// unique identifier is named by id not default _id
test('unique identifier property  of blogpost is named id', async () => {
  const res = await api.get('/api/blogs')
  // console.log('res', res.body)
  let getBlogKeys = res.body
    .map(blogKey => Object.keys(blogKey))
  getBlogKeys.map(bk => {
    expect(bk).toEqual(expect.arrayContaining(['id']))
  })
})

test('fails with status code 400 if title and url is missing', async () => {
  const newBlog = {
    likes: 4,
    author: 'testman'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDB()

  expect(blogsAtEnd.length).toBe(helper.initialBlog.length)

})

test(' blog without likes property will have  0 likes by default', async () => {
  let newBlog = await helper.blogsInDB()
  newBlog = {
    title: 'blog where likes in missing',
    author: 'unlikely will be likely',
    url: 'www.unlikely@likely.com',

  }
  const blogsAtEnd = await api.post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(blogsAtEnd.body.likes).toBe(0)
})




// test('fails with status')
afterAll(() => {
  mongoose.connection.close()
})