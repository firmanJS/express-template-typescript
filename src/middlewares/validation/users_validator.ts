import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import Validation from './index'
import Lang from '../../lang'

const validateUpdate = [
  check('email').isEmail().withMessage(Lang.__('validator.invalid.type', { field: 'email' })),
  (req: Request, res: Response, next: NextFunction) => {
    Validation.validationResults(req, res, next)
  }
]

export {
  validateUpdate
}
