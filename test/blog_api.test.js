const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('content-type', /application\/json/)
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
afterAll(() => {
  mongoose.connection.close()
})