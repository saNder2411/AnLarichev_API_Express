import express from 'express'
import { userRouter } from './users/users.js'

const PORT = 8000

const app = express()

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`Server run on: http://localhost:${PORT}`)
})
