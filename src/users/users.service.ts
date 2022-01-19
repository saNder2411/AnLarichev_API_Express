import 'reflect-metadata'

import { inject, injectable } from 'inversify'

import { IConfigService } from '../config/config.service.interface'
import { TYPES } from '../types'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { User } from './user.entity'
import { IUserService } from './users.service.interface'

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.IConfigService) private configService: IConfigService) {}

	async create({ email, name, password }: UserRegisterDto) {
		const newUser = new User(email, name)
		console.log(+this.configService.get('SALT'))
		await newUser.setPassword(password, +this.configService.get('SALT'))
		return newUser
	}

	async validate(dto: UserLoginDto) {
		return true
	}
}
