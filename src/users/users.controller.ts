import { injectable, inject } from 'inversify'
import 'reflect-metadata'

import { IUserController } from './users.controller.interface'
import { TYPES } from './../types'

import { BaseController } from '../common/base.controller'
import { HttpError } from '../errors/http.error.class'
// Types
import { Request, Response, NextFunction } from 'express'
import { ILogger } from '../logger/logger.interface'
import { UserRegisterDto } from './dto/user-register.dto'
import { UserLoginDto } from './dto/user-login.dto'

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService)
		this.bindRoutes([
			{ path: '/register', methodKey: 'post', callback: this.register },
			{ path: '/login', methodKey: 'post', callback: this.login },
		])
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		// this.ok(res, 'login')

		console.log(req.body)
		next(new HttpError(401, 'Authorization Error!', 'login'))
	}

	register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		console.log(req.body)
		this.ok(res, 'register')
	}
}
