import { Container, ContainerModule, interfaces } from 'inversify'

import { App } from './app'
import { ConfigService } from './config/config.service'
import { IConfigService } from './config/config.service.interface'
import { PrismaService } from './database/prisma.service'
import { IPrismaService } from './database/prisma.service.interface'
import { ExceptionFilter } from './errors/exception.filter'
import { IExceptionFilter } from './errors/exception.filter.interface'
import { ILogger } from './logger/logger.interface'
import { LoggerService } from './logger/logger.service'
import { TYPES } from './types'
import { UserController } from './users/users.controller'
import { IUserController } from './users/users.controller.interface'
import { UsersRepository } from './users/users.repository'
import { IUsersRepository } from './users/users.repository.interface'
import { UserService } from './users/users.service'
import { IUserService } from './users/users.service.interface'

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope()
	bind<IUserController>(TYPES.IUserController).to(UserController)
	bind<IUserService>(TYPES.IUserService).to(UserService)
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter)
	bind<App>(TYPES.App).to(App)
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope()
	bind<IPrismaService>(TYPES.IPrismaService).to(PrismaService).inSingletonScope()
	bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository).inSingletonScope()
})

const bootstrap = async () => {
	const appContainer = new Container()
	appContainer.load(appBindings)

	const app = appContainer.get<App>(TYPES.App)
	await app.init()

	return { app, appContainer }
}

export const boot = bootstrap()
