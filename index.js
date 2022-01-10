import express from 'express'

const PORT = 8000

const app = express()

app.all('/hello', (req, res, next) => {
  console.log('All')
  next()
})

const cb = (req, res, next) => {
  console.log('cb')
  next()
}

app.get('/hello', [
  cb,
  cb,
  cb,
  (req, res) => {
    res.send('Hello World!')
  },
])

app.listen(PORT, () => {
  console.log(`Server run on: http://localhost:${PORT}`)
})
