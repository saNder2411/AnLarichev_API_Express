import express, { Express, Router } from 'express'
import { Server } from 'http'

import { userRouter } from './users/users.js'

export class App {
  app: Express
  server: Server
  port: number

  constructor() {
    this.app = express()

    this.port = 8000
  }

  useRoutes() {
    this.app.use('/users', userRouter)
  }

  async init() {
    this.useRoutes()

    this.server = this.app.listen(this.port, () => {
      console.log(`Server run on: http://localhost:${this.port}`)
    })
  }
}
