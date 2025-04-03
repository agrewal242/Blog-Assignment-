// server.js
const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// In-memory store of blog posts
// { "uuid": { title: "...", content: "..." }, ... }
const blogPosts = {}

// GET all posts => array of { id, title, content }
app.get('/posts', (req, res) => {
  const postsArray = Object.keys(blogPosts).map((id) => ({
    id,
    title: blogPosts[id].title,
    content: blogPosts[id].content,
    date: blogPosts[id].date,
  }))
  res.send(postsArray)
})

// GET a single post by ID
app.get('/posts/:id', (req, res) => {
  const { id } = req.params
  if (!blogPosts[id]) {
    return res.status(404).send({ error: 'Post not found' })
  }
  res.send({ id, ...blogPosts[id] })
})

// POST => create a new post
app.post('/posts', (req, res) => {
  const { title, content, date } = req.body
  if (!title || !content) {
    return res.status(400).send({ error: 'Title and content are required.' })
  }
  const newId = uuidv4()
  blogPosts[newId] = { title, content, date }
  res.send({ success: true, id: newId })
})

// PUT => update an existing post by ID
app.put('/posts/:id', (req, res) => {
  const { id } = req.params
  if (!blogPosts[id]) {
    return res.status(404).send({ error: 'Post not found' })
  }
  const { title, content,date } = req.body
  blogPosts[id] = { title, content, date }
  res.send({ success: true, post: { id, title, content, date } })
})

// DELETE => remove a post by ID
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params
  if (!blogPosts[id]) {
    return res.status(404).send({ error: 'Post not found' })
  }
  delete blogPosts[id]
  res.send({ success: true })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
