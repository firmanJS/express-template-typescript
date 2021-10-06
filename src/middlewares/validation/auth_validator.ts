import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import Validation from './index'

const validateRegister = [
  check('username').isString().withMessage('username must be string'),
  check('password').isLength({ min: 6 }).withMessage('password min 6 character'),
  (req: Request, res: Response, next: NextFunction) => {
    Validation.validationResults(req, res, next)
  }
]

const validateLogin = [
  check('username').notEmpty().withMessage('username required'),
  check('password').notEmpty().withMessage('password required'),
  (req: Request, res: Response, next: NextFunction) => {
    Validation.validationResults(req, res, next)
  }
]

export {
  validateLogin, validateRegister
}
