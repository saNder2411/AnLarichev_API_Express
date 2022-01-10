import express from 'express'

const PORT = 8000

const app = express()

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server run on: http://localhost:${PORT}`)
})
