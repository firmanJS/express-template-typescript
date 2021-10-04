import BaseRest from '../base'
import validate from '../../../middlewares/validation/auth_validator'

import AuthUsecase from '../../../usecase/auth_usecase'

class AuthRoutes extends BaseRest {
  public routes(): void {
    this.router.post('/register', validate, AuthUsecase.register)
  }
}

export default new AuthRoutes().router
