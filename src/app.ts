import express, { Express } from 'express'
import { Server } from 'http'
import { injectable, inject } from 'inversify'
import { json } from 'body-parser'
import 'reflect-metadata'

import { TYPES } from './types'
// Types
import { ILogger } from './logger/logger.interface'
import { IConfigService } from './config/config.service.interface'
import { IUserController } from './users/users.controller.interface'
import { IExceptionFilter } from './errors/exception.filter.interface'
import { IPrismaService } from './database/prisma.service.interface'
import { AuthMiddleware } from './common/auth.middleware'

@injectable()
export class App {
	app: Express
	server: Server

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUserController) private userController: IUserController,
		@inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IPrismaService) private prismaService: IPrismaService,
	) {
		this.app = express()
	}

	useMiddleware() {
		this.app.use(json())

		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'))

		this.app.use(authMiddleware.execute.bind(authMiddleware))
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
		await this.prismaService.connect()

		this.server = this.app.listen(this.configService.get('PORT'), () => {
			this.logger.log(`Server run on: http://localhost:${this.configService.get('PORT')}`)
		})
	}

	close() {
		this.server.close()
	}
}
