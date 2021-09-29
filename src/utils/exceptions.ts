import { Request, Response } from 'express'
import { ExceptionsInterface } from '../interface/response'

class Exceptions extends Error {
  public static notFoundHandler = (req: Request, res: Response): Response => {
    const msg: string = `Route : ${req.url} Not found.`
    const err: any = new Error(msg)

    const result: ExceptionsInterface = {
      message: `Route : ${req.url} Not found.`,
      error: err.toString()
    }

    return res.status(404).json(result)
  }

  public static errorHandler = (req: Request, res: Response): Response => {
    if (!req.statusCode) req.statusCode = 500

    const result: ExceptionsInterface = {
      message: req.statusMessage,
      error: req.statusMessage
    }

    return res.status(req.statusCode).json(result)
  }
}

export default Exceptions
