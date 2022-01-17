import express, { Express } from 'express'
import { Server } from 'http'
import { injectable, inject } from 'inversify'
import { json } from 'body-parser'
import 'reflect-metadata'

import { TYPES } from './types'
// Types
import { ILogger } from './logger/logger.interface'
import { UserController } from './users/users.controller'
import { ExceptionFilter } from './errors/exception.filter'

@injectable()
export class App {
	app: Express
	server: Server

	constructor(
		@inject(TYPES.AppPort) private port: number,
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUserController) private userController: UserController,
		@inject(TYPES.IExceptionFilter) private exceptionFilter: ExceptionFilter,
	) {
		this.app = express()
	}

	useMiddleware() {
		this.app.use(json())
	}

	useRoutes() {
		this.app.use('/users', this.userController.router)
	}

	useExceptionFilters() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
	}

	async init() {
		this.useMiddleware()
		this.useRoutes()
		this.useExceptionFilters()

		this.server = this.app.listen(this.port, () => {
			this.logger.log(`Server run on: http://localhost:${this.port}`)
		})
	}
}
