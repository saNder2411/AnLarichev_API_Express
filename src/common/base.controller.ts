import 'reflect-metadata'

import { Response, Router } from 'express'
import { injectable } from 'inversify'

import { ILogger } from '../logger/logger.interface'
import { ControllerRoute } from './route.interface'

export { Router } from 'express'

@injectable()
export abstract class BaseController {
	readonly _router: Router = Router()

	constructor(private logger: ILogger) {}

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

			const middlewares = r.middlewares?.map((m) => m.execute.bind(m))

			const handler = r.callback.bind(this)

			const pipeline = middlewares ? [...middlewares, handler] : handler

			this.router[r.methodKey](r.path, pipeline)
		})
	}
}
