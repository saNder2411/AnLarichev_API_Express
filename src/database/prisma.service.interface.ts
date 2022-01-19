import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'

export interface IPrismaService {
	client: PrismaClient
	connect: () => Promise<void>
	disconnect: () => Promise<void>
}
