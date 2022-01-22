import 'reflect-metadata'

import { UserModel } from '@prisma/client'
import { Container } from 'inversify'

import { IConfigService } from '../config/config.service.interface'
import { TYPES } from '../types'
import { User } from './user.entity'
import { IUsersRepository } from './users.repository.interface'
import { UserService } from './users.service'
import { IUserService } from './users.service.interface'

const ConfigServiceMock: IConfigService = { get: jest.fn() }

const UserRepositoryMock: IUsersRepository = { create: jest.fn(), find: jest.fn() }

const container = new Container()

let configService: IConfigService
let usersRepository: IUsersRepository
let usersService: IUserService

beforeAll(() => {
	container.bind<IUserService>(TYPES.IUserService).to(UserService)
	container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(ConfigServiceMock)
	container.bind<IUsersRepository>(TYPES.IUsersRepository).toConstantValue(UserRepositoryMock)

	configService = container.get<IConfigService>(TYPES.IConfigService)
	usersRepository = container.get<IUsersRepository>(TYPES.IUsersRepository)
	usersService = container.get<IUserService>(TYPES.IUserService)
})

let createdUser: UserModel | null

describe('User Service', () => {
	it('create', async () => {
		configService.get = jest.fn().mockReturnValueOnce(1)
		usersRepository.find = jest.fn().mockReturnValueOnce(null)
		usersRepository.create = jest
			.fn()
			.mockImplementation(({ email, name, password }: User): UserModel => ({ email, name, password, id: 1 }))

		createdUser = await usersService.create({ email: 'a@a.com', name: 'Ben', password: '1234' })
		expect(createdUser?.id).toEqual(1)
		expect(createdUser?.password).not.toEqual('1234')
		expect(createdUser?.name).toEqual('Ben')
	})

	it('create user when user is already exist', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser)

		const user = await usersService.create({ email: 'a@a.com', name: 'Ben', password: '1234' })
		expect(user).toEqual(null)
	})

	it('validate when user is exist', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser)

		const res = await usersService.validate({ email: 'a@a.com', password: '1234' })
		expect(res).toBeTruthy()
	})

	it('validate when user is not exist', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null)

		const res = await usersService.validate({ email: 'a@a.com', password: '1234' })
		expect(res).toEqual(false)
	})

	it('validate when user input not valid password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser)

		const res = await usersService.validate({ email: 'a@a.com', password: '' })
		expect(res).toEqual(false)
	})
})
