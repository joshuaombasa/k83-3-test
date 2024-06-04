const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { randomBytes } = require('crypto')
const PORT = 7001

const app = express()
app.use(express.json())
app.use(cors())

const comments = {}

app.get('/api/posts', (request, response) => {
  response.send(posts)
})

app.post('/api/:postId/comments', async (request, response) => {
  const { comment } = request.body
  const id = randomBytes(4).toString('hex')
  const postId = request.params.postId
  comments[id] = { postId, id, comment, status: 'pending' }

  try {
    await axios.post(`http://127.0.0.1:7005/api/events`, {
      type: 'CommentCreated',
      data: comments[id]
    })
  } catch (error) {
    console.log(error)
  }

  response.send(comments[id])
})

app.post('/api/events', async (request, response) => {
  const event = request.body
  const { type, data } = event
  console.log(event)

  if (type === 'CommentModerated') {
    const { postId, id, comment, status } = data
    comments[id].status = status
    try {
      await axios.post(`http://127.0.0.1:7005/api/events`, {
        type: 'CommentUpdated',
        data: { postId, id, comment, status }
      })
    } catch (error) {
      console.log(error)
    }
  }
  response.send()
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})