import BaseRest from './base'
import validate from '../../middlewares/auth_validator'
// import { auth } from '../../middlewares/auth'

// usecase
import AuthUsecase from '../../usecase/auth_usecase'

class AuthRoutes extends BaseRest {
  public routes(): void {
    this.router.post('/register', validate, AuthUsecase.register)
    // this.router.post('/login', validate, AuthUsecase.login)
    // this.router.get('/profile', auth, AuthUsecase.profile)
  }
}

export default new AuthRoutes().router
