import { IUserController } from './users.controller.interface'
import { TYPES } from './../types'
import { injectable, inject } from 'inversify'
import 'reflect-metadata'

import { BaseController } from '../common/base.controller'
import { HttpError } from '../errors/http.error.class'
// Types
import { Request, Response, NextFunction } from 'express'
import { ILogger } from '../logger/logger.interface'

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService)
		this.bindRoutes([
			{ path: '/register', methodKey: 'post', callback: this.register },
			{ path: '/login', methodKey: 'post', callback: this.login },
		])
	}

	login(req: Request, res: Response, next: NextFunction) {
		// this.ok(res, 'login')

		next(new HttpError(401, 'Authorization Error!', 'login'))
	}

	register(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'register')
	}
}
