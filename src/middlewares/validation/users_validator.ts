import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import Validation from './index'

const validateUpdate = [
  check('email').isEmail().withMessage('is invalid email'),
  (req: Request, res: Response, next: NextFunction) => {
    Validation.validationResults(req, res, next)
  }
]

export {
  validateUpdate
}
