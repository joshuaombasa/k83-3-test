const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { randomBytes } = require('crypto')
const PORT = 7004

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
// })

app.post('/api/events', (request, response) => {
  const event = request.body
  const { type, data } = event
  console.log(type, data)

  if (type === 'PostCreated') {
    const { post, id } = data
    posts[id] = { postId: id, post, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { postId, id, comment, status } = data
    const comments = posts[postId].comments
    comments.push({ id, comment, status })
  }

  if (type === 'CommentUpdated') {
    const { postId, id, comment, status } = data
    const comments = posts[postId].comments
    const commentToUpdate = comments.find(comment => comment.id === id)
    commentToUpdate.status = status
  }
  console.log(posts)
  response.send(posts)
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
