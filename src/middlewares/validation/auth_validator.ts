import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import Validation from './index'
import Lang from '../../lang'

const messageUsername: string = Lang.__('validator.required', { field: 'username' })
const messagePassword: string = Lang.__('validator.required', { field: 'password' })
const mustString: string = Lang.__('validator.string', { field: 'username' })
const minCharacter: string = Lang.__('validator.min', { field: 'password', min: '6' })

const validateRegister = [
  check('username').isString().withMessage(mustString),
  check('password').isLength({ min: 6 }).withMessage(minCharacter),
  (req: Request, res: Response, next: NextFunction) => {
    Validation.validationResults(req, res, next)
  }
]

const validateLogin = [
  check('username').notEmpty().withMessage(messageUsername),
  check('password').notEmpty().withMessage(messagePassword),
  (req: Request, res: Response, next: NextFunction) => {
    Validation.validationResults(req, res, next)
  }
]

export {
  validateLogin, validateRegister
}
