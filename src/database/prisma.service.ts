import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import { IPrismaService } from './prisma.service.interface'

@injectable()
export class PrismaService implements IPrismaService {
	client: PrismaClient
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient()
	}

	async connect() {
		try {
			await this.client.$connect()
			this.logger.log('[PrismaService] connect to db')
		} catch (err) {
			if (err instanceof Error) this.logger.error(`[PrismaService] Error connect to db ${err.message}`)
		}
	}

	async disconnect() {
		await this.client.$disconnect()
		this.logger.log('[PrismaService] disconnect from db')
	}
}
