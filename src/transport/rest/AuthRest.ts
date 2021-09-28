import BaseRest from './BaseRest'
import validate from '../../middlewares/AuthValidator'
import { auth } from '../../middlewares/AuthMiddleware'

// Controllers
import AuthController from '../../usecase/AuthUsecase'

class AuthRoutes extends BaseRest {
  public routes(): void {
    this.router.post('/register', validate, AuthController.register)
    this.router.post('/login', validate, AuthController.login)
    this.router.get('/profile', auth, AuthController.profile)
  }
}

export default new AuthRoutes().router
