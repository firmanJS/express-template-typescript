import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import httpStatus from 'http-status'
import { ExceptionsInterface } from '../interface/response'
import { AuthInterface } from '../interface/config'
import JsonMessage from '../utils/json'

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
    res.status(httpStatus.UNAUTHORIZED).json(result)
  } catch (error: any) {
    JsonMessage.catchResponse(error, res)
  }
}

export const tokenValidation = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.headers.authorization) {
    const result: ExceptionsInterface = {
      message: 'token required',
      error: 'token is not set'
    }

    return res.status(httpStatus.UNAUTHORIZED).json(result)
  }

  const keyAuth: AuthInterface = {
    secretKey: process.env.JWT_SECRET_KEY!,
    token: req.headers.authorization.split(' ')[1]
  }

  return verifyToken(keyAuth, res, next)
}
