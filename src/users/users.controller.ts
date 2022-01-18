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
import { User } from './user.entity'
import { IUserService } from './users.service.interface'
import { ValidateMiddleware } from '../common/validate.middleware'

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUserService) private userService: IUserService,
	) {
		super(loggerService)
		this.bindRoutes([
			{
				path: '/register',
				methodKey: 'post',
				callback: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{ path: '/login', methodKey: 'post', callback: this.login },
		])
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		// this.ok(res, 'login')

		console.log(req.body)
		next(new HttpError(401, 'Authorization Error!', 'login'))
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		const result = await this.userService.create(body)

		if (!result) return next(new HttpError(422, 'This user is already exists!'))

		this.ok(res, result)
	}
}
