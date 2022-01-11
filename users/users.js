import { Router } from 'express'

export const userRouter = Router()

userRouter.use((req, res, next) => {
  console.log('users handler', Date.now())
  next()
})

userRouter.post('/login', (req, res) => {
  res.send('login')
})

userRouter.post('/register', (req, res) => {
  res.send('register')
})
