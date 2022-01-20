import { UserModel } from '@prisma/client'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { User } from './user.entity'

export interface IUserService {
	create: (dto: UserRegisterDto) => Promise<UserModel | null>
	validate: (dto: UserLoginDto) => Promise<boolean>
	getUser: (email: string) => Promise<UserModel | null>
}
