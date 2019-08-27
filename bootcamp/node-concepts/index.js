const express = require('express')

const app = express()

app.use(express.json())

// localhost:3000

const users = ['Murilo', 'Sheila', 'Bipe']

app.get('/users', (req, res) => {
  return res.json(users)
})

app.get('/users/:index', (req, res) => {
  const { index } = req.params

  return res.json(users[index])
})

app.post('/users', (req, res) => {
  const { name } = req.body

  users.push(name)

  return res.json(users)
})

app.put('/users/:index', (req, res) => {
  const { name } = req.body
  const { index } = req.params

  users[index] = name

  return res.json(users)
})

app.delete('/users/:index', (req, res) => {
  const { index } = req.params

  users.splice(index, 1)

  return res.json(users)
})

app.listen(3000)
