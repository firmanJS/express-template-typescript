import BaseRest from '../base'
import { validateRegister, validateLogin } from '../../../middlewares/validation/auth_validator'
import { AuthHandler } from '../handler'

class AuthRest extends BaseRest {
  public routes(): void {
    this.router.post('/register', validateRegister, AuthHandler.register)
    this.router.post('/login', validateLogin, AuthHandler.login)
  }
}

export default new AuthRest().router
