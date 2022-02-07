import 'reflect-metadata'

import { inject, injectable } from 'inversify'

import { IPrismaService } from '../database/prisma.service.interface'
import { TYPES } from '../types'
import { User } from './user.entity'
import { IUsersRepository } from './users.repository.interface'

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.IPrismaService) private prismaService: IPrismaService) {}

	async create({ email, password, name }: User) {
		return this.prismaService.client.userModel.create({ data: { email, password, name } })
	}

	async find(email: string) {
		return await this.prismaService.client.userModel.findFirst({ where: { email } })
	}
}
