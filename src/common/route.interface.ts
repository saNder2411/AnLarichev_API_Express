import { NextFunction, Request, Response, Router } from 'express'
import { IMiddleware } from './middleware.interface'

export interface ControllerRoute {
	path: string
	callback: (req: Request, res: Response, next: NextFunction) => void
	methodKey: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
	middlewares?: IMiddleware[]
}
