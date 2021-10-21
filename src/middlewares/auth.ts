import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import httpStatus from 'http-status'
import { ExceptionsInterface } from '../interface/response'
import { AuthInterface } from '../interface/config'
import JsonMessage from '../utils/json'
import Lang from '../lang'

const verifyToken = (keyAuth: AuthInterface, res: Response, next: NextFunction) : any => {
  try {
    const credential: object | any = jwt.verify(keyAuth.token!, keyAuth.secretKey!)
    if (credential) {
      return next()
    }
    const result: ExceptionsInterface = {
      message: Lang.__('token.invalid.message'),
      error: Lang.__('token.invalid')
    }
    return res.status(httpStatus.UNAUTHORIZED).json(result)
  } catch (error: any) {
    return JsonMessage.catchResponse(error, res)
  }
}

export const tokenValidation = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.headers.authorization) {
    const result: ExceptionsInterface = {
      message: Lang.__('validator.required', { field: 'token' }),
      error: Lang.__('token.notset')
    }

    return res.status(httpStatus.UNAUTHORIZED).json(result)
  }

  const keyAuth: AuthInterface = {
    secretKey: process.env.JWT_SECRET_KEY!,
    token: req.headers.authorization.split(' ')[1]
  }

  return verifyToken(keyAuth, res, next)
}
