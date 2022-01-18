import { NextFunction, Request, Response } from 'express'
import { IMiddleware } from './middleware.interface'

export class ValidateMiddleware implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction) {
		console.log(req)
	}
}
