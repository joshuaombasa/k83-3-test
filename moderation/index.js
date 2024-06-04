const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { randomBytes } = require('crypto')
const PORT = 7003

const app = express()
app.use(express.json())
app.use(cors())


app.post('/api/events', async (request, response) => {
  const event = request.body
  const { type, data } = event
  console.log(event)

  if (type === 'CommentCreated') {
    const { postId, id, comment, status } = data

    const updatedStatus = comment.includes('sex') ? 'rejected' : 'approved'

    try {
      await axios.post(`http://127.0.0.1:7005/api/events`, {
        type: 'CommentModerated',
        data: { postId, id, comment, status: updatedStatus }
      })
    } catch (error) {
      console.log(error)
    }
  }
  response.send({})
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})