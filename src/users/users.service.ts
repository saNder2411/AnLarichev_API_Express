import 'reflect-metadata'

import { inject, injectable } from 'inversify'

import { IConfigService } from '../config/config.service.interface'
import { TYPES } from '../types'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { User } from './user.entity'
import { IUserService } from './users.service.interface'
import { IUsersRepository } from './users.repository.interface'

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
	) {}

	async create({ email, name, password }: UserRegisterDto) {
		const newUser = new User(email, name)

		await newUser.setPassword(password, +this.configService.get('SALT'))

		const existedUser = await this.usersRepository.find(email)
		return existedUser ? null : await this.usersRepository.create(newUser)
	}

	async validate({ email, password }: UserLoginDto) {
		const userRepo = await this.usersRepository.find(email)

		if (!userRepo) return false

		const userBus = new User(email, userRepo.name, userRepo.password)

		return userBus.comparePassword(password)
	}

	async getUser(email: string) {
		return this.usersRepository.find(email)
	}
}
