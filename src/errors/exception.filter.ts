// Types
import { Request, Response, NextFunction } from 'express'
import { LoggerService } from '../logger/logger.service'
import { IExceptionFilter } from './exception.filter.interface'
import { HttpError } from './http.error.class'

export class ExceptionFilter implements IExceptionFilter {
  constructor(public logger: LoggerService) {}

  catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
      this.logger.error(`[${err?.errorCtx ?? ''}] Error ${err.statusCode}: ${err.message}`)
      return res.status(err.statusCode).send({ error: err.message })
    }

    this.logger.error(`${err.message}`)
    res.status(500).send({ error: err.message })
  }
}
