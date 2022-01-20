import { NextFunction, Request, Response } from 'express'

import { HttpError } from '../errors/http.error.class'
import { IMiddleware } from './middleware.interface'

export class AuthGuardMiddleware implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction) {
		req.userEmail ? next() : res.status(401).send({ error: 'You are not authorize!' })
	}
}
