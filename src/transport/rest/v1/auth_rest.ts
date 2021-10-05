import BaseRest from '../base'
import { validateRegister, validateLogin } from '../../../middlewares/validation/auth_validator'
import AuthUsecase from '../../../usecase/auth_usecase'

class AuthRoutes extends BaseRest {
  public routes(): void {
    this.router.post('/register', validateRegister, AuthUsecase.register)
    this.router.post('/login', validateLogin, AuthUsecase.login)
  }
}

export default new AuthRoutes().router
