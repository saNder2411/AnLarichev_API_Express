import { inject, injectable } from 'inversify'
import 'reflect-metadata'

import { TYPES } from './../types'
// Types
import { Request, Response, NextFunction } from 'express'
import { ILogger } from '../logger/logger.interface'
import { IExceptionFilter } from './exception.filter.interface'
import { HttpError } from './http.error.class'

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
      this.logger.error(`[${err?.errorCtx ?? ''}] Error ${err.statusCode}: ${err.message}`)
      return res.status(err.statusCode).send({ error: err.message })
    }

    this.logger.error(`${err.message}`)
    res.status(500).send({ error: err.message })
  }
}
