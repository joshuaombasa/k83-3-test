const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { randomBytes } = require('crypto')
const PORT = 7005

const app = express()
app.use(express.json())
app.use(cors())

const events = {}

app.get('/api/events', (request, response) => {
  response.send(events)
})

app.post('/api/events', async (request, response) => {
  const event = request.body
  const { type, data } = event
  try {
    await axios.post('http://127.0.0.1:7004/api/events', event)
    await axios.post('http://127.0.0.1:7003/api/events', event)
    await axios.post('http://127.0.0.1:7001/api/events', event)
    await axios.post('http://127.0.0.1:7000/api/events', event)
  } catch (error) {
    console.log(error)
  }

  response.send({})
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})