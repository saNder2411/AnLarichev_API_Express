import 'reflect-metadata'

import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { sign } from 'jsonwebtoken'

import { BaseController } from '../common/base.controller'
import { ValidateMiddleware } from '../common/validate.middleware'
import { HttpError } from '../errors/http.error.class'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from './../types'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { IUserController } from './users.controller.interface'
import { IUserService } from './users.service.interface'
import { IConfigService } from '../config/config.service.interface'

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUserService) private userService: IUserService,
		@inject(TYPES.IConfigService) private configService: IConfigService,
	) {
		super(loggerService)
		this.bindRoutes([
			{
				path: '/register',
				methodKey: 'post',
				callback: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				methodKey: 'post',
				callback: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				methodKey: 'get',
				callback: this.info,
			},
		])
	}

	async login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		const result = await this.userService.validate(body)

		if (!result) return next(new HttpError(401, 'Authorization Error!', 'login'))

		const jwt = await this.signJWT(body.email, this.configService.get('SECRET'))

		this.ok(res, { jwt })
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		const result = await this.userService.create(body)

		if (!result) return next(new HttpError(422, 'This user is already exists!'))

		this.loggerService.log(`[UserController] create user: ${result.name}`)

		this.ok(res, result)
	}

	private signJWT(email: string, secret: string) {
		return new Promise<string>((resolve, reject) => {
			sign({ email, iat: Date.now() }, secret, { algorithm: 'HS256' }, (err, token) =>
				err ? reject(err) : resolve(token ?? ''),
			)
		})
	}

	async info({ user }: Request, res: Response, next: NextFunction) {
		this.ok(res, { email: user })
	}
}
