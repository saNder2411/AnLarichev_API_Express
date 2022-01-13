import express, { Express, Router } from 'express'
import { Server } from 'http'
// Types
import { LoggerService } from './logger/logger.service'
import { UserController } from './users/users.controller'
import { ExceptionFilter } from './errors/exception.filter'

export class App {
  app: Express
  server: Server

  constructor(
    public port: number,
    public logger: LoggerService,
    public userController: UserController,
    public exceptionFilter: ExceptionFilter
  ) {
    this.app = express()
  }

  useRoutes() {
    this.app.use('/users', this.userController.router)
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
  }

  async init() {
    this.useRoutes()
    this.useExceptionFilters()

    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Server run on: http://localhost:${this.port}`)
    })
  }
}
