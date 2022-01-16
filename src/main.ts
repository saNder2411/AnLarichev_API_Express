import { Container, ContainerModule, interfaces } from 'inversify'

import { App } from './app'
import { LoggerService } from './logger/logger.service'
import { UserController } from './users/users.controller'
import { IUserController } from './users/users.controller.interface'
import { ExceptionFilter } from './errors/exception.filter'
import { IExceptionFilter } from './errors/exception.filter.interface'
import { TYPES } from './types'
import { ILogger } from './logger/logger.interface'

// const logger = new LoggerService()
// const app = new App(logger, new UserController(logger), new ExceptionFilter(logger))
// await app.init()

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService)
  bind<IUserController>(TYPES.IUserController).to(UserController)
  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter)
  bind<App>(TYPES.App).to(App)
  bind<number>(TYPES.AppPort).toConstantValue(8000)
})

const bootstrap = () => {
  const appContainer = new Container()
  appContainer.load(appBindings)

  const app = appContainer.get<App>(TYPES.App)
  app.init()

  return { app, appContainer }
}

export const { app, appContainer } = bootstrap()
