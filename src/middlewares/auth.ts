import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ExceptionsInterface } from '../interface/response'

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.headers.authorization) {
    const result: ExceptionsInterface = {
      message: 'token required',
      error: 'token is not set'
    }

    return res.status(401).json(result)
  }

  const secretKey = process.env.JWT_SECRET_KEY || 'secret'
  const token: string = req.headers.authorization.split(' ')[1]

  try {
    const credential: string | object = jwt.verify(token, secretKey)

    if (credential) {
      req.app.locals.credential = credential
      return next()
    }
    const result: ExceptionsInterface = {
      message: 'token is invalid',
      error: 'invalid token'
    }
    return res.status(401).json(result)
  } catch (error) {
    const result: ExceptionsInterface = {
      message: 'token is invalid',
      error: `error : ${error.toString()}`
    }
    return res.status(500).json(result)
  }
}
