import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import Exceptions from '../../utils/exceptions'

class Validation {
  public static validationResults = (req: Request, res: Response, next: NextFunction): any => {
    const errors: any = validationResult(req)

    if (!errors.isEmpty()) {
      return Exceptions.validationHandler(req, res, errors.array())
    }
    return next()
  }
}

export default Validation
