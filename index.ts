import express, { Request, Response, NextFunction } from 'express'
import { userRouter } from './users/users.js'

const PORT = 8000

const app = express()

app.use((req, res, next) => {
  console.log(Date.now())
  next()
})

app.get('/hello', (req, res) => {
  // res.send('Hello World!')
  throw new Error('Error!')
})

app.use('/users', userRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message)
  res.status(500).send(err.message)
})

app.listen(PORT, () => {
  console.log(`Server run on: http://localhost:${PORT}`)
})
