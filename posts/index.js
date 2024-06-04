const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { randomBytes } = require('crypto')
const PORT = 7000

const app = express()
app.use(express.json())
app.use(cors())

const posts = {}

app.get('/api/posts', (request, response) => {
  response.send(posts)
})

app.post('/api/posts', async (request, response) => {
  const { post } = request.body
  const id = randomBytes(4).toString('hex')
  posts[id] = { post, id }
  console.log(posts[id])

  try {
    await axios.post(`http://127.0.0.1:7005/api/events`, {
      type: 'PostCreated',
      data: { post, id }
    })
  } catch (error) {
    console.log(error)
  }
  response.send(posts)
})

app.post('/api/events', (request, response) => {
  const event = request.body
  const { type, data } = event
  console.log(event)
  response.send()
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})