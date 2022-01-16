// Types
import { Request, Response, NextFunction } from 'express'
import { ILogger } from '../logger/logger.interface'

export interface IUserController {
  login: (req: Request, res: Response, next: NextFunction) => void
  register: (req: Request, res: Response, next: NextFunction) => void
}
