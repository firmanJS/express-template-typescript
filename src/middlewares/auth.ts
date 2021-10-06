import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ExceptionsInterface } from '../interface/response'
import { AuthInterface } from '../interface/config'

const verifyToken = (keyAuth: AuthInterface, res: Response, next: NextFunction) : void => {
  try {
    const credential: string | object = jwt.verify(keyAuth.token!, keyAuth.secretKey!)

    if (credential) {
      next()
    }
    const result: ExceptionsInterface = {
      message: 'token is invalid',
      error: 'invalid token'
    }
    res.status(401).json(result)
  } catch (error: any) {
    const result: ExceptionsInterface = {
      message: 'token is invalid',
      error: `error : ${error.toString()}`
    }
    res.status(500).json(result)
  }
}

export const tokenValidation = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.headers.authorization) {
    const result: ExceptionsInterface = {
      message: 'token required',
      error: 'token is not set'
    }

    return res.status(401).json(result)
  }

  const keyAuth: AuthInterface = {
    secretKey: process.env.JWT_SECRET_KEY!,
    token: req.headers.authorization.split(' ')[1]
  }

  return verifyToken(keyAuth, res, next)
}
