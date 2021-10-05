import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'
import Exceptions from '../../utils/exceptions'

const validateRegister = [
  check('username').isString().withMessage('username must be string'),
  check('password').isLength({ min: 6 }).withMessage('password min 6 character'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return Exceptions.validationHandler(req, res, errors.array())
    }

    return next()
  }
]

const validateLogin = [
  check('username').notEmpty().withMessage('username required'),
  check('password').notEmpty().withMessage('password required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return Exceptions.validationHandler(req, res, errors.array())
    }

    return next()
  }
]

export {
  validateLogin, validateRegister
}
