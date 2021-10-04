import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'
import Exceptions from '../../utils/exceptions'

const validate = [
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

export default validate
