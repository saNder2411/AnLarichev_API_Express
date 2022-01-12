import express, { Express, Router } from 'express'
import { Server } from 'http'
// Instruments
import { LoggerService } from './logger/logger.service'
import { userRouter } from './users/users'

export class App {
  app: Express
  server: Server
  port: number
  logger: LoggerService

  constructor(logger: LoggerService) {
    this.app = express()

    this.port = 8000

    this.logger = logger
  }

  useRoutes() {
    this.app.use('/users', userRouter)
  }

  async init() {
    this.useRoutes()

    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Server run on: http://localhost:${this.port}`)
    })
  }
}
