import { Router, Response } from 'express'
import { injectable } from 'inversify'
import 'reflect-metadata'
// Dependencies
import { ILogger } from '../logger/logger.interface'
// Types
import { ControllerRoute } from './route.interface'

export { Router } from 'express'

@injectable()
export abstract class BaseController {
	readonly _router: Router

	constructor(private logger: ILogger) {
		this._router = Router()
	}

	get router() {
		return this._router
	}

	send<T>(res: Response, code: number, data: T) {
		res.type('application/json')
		return res.status(code).json(data)
	}

	ok<T>(res: Response, data: T) {
		this.send(res, 200, data)
	}

	created(res: Response) {
		return res.sendStatus(201)
	}

	protected bindRoutes(routes: ControllerRoute[]) {
		routes.forEach((r) => {
			this.logger.log(`[${r.methodKey}] ${r.path}`)

			const middleware = r.middlewares?.map((m) => m.execute.bind(m))

			const handler = r.callback.bind(this)

			const pipeline = middleware ? [...middleware, handler] : handler

			this.router[r.methodKey](r.path, pipeline)
		})
	}
}
