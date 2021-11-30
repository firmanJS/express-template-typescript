import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { ExceptionsInterface, WithDataInterface } from '../interface/response'

export class Exceptions extends Error {
  public static notFoundHandler = (req: Request, res: Response): Response => {
    const msg: string = `Route : ${req.url} Not found.`
    const err: any = new Error(msg)

    const result: ExceptionsInterface = {
      message: `Route : ${req.url} Not found.`,
      error: err.toString()
    }

    return res.status(httpStatus.NOT_FOUND).json(result)
  }

  public static validationHandler = (req: Request, res: Response, err: object): Response => {
    const result: WithDataInterface = {
      status: 'validation error',
      message: `error in validation body ${req.originalUrl}`,
      data: err
    }

    return res.status(httpStatus.BAD_REQUEST).send(result)
  }

  public static errorHandler = (err: any, _req: Request, res: Response): Response => {
    let { statusCode, message } = err;
    if (process.env.NODE_ENV === 'production' && !err.isOperational) {
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const result: ExceptionsInterface = {
      message,
      error: err.toString(),
    };

    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    return res.status(statusCode).send(result);
  }

  public static syntaxError = (err: any, req: Request, res: Response, next: NextFunction): void => {
    const statusCode: number = err.status
    const result: WithDataInterface = {
      status: `syntax error ${err.type}`,
      message: `${err.toString()}`,
      data: err
    }
    if (err instanceof SyntaxError) {
      res.status(statusCode).send(result);
    } else {
      next();
    }
  }
}
