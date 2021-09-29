import AuthRest from './auth_rest'
import BaseRest from './base'

class RestHttp extends BaseRest {
  public routes(): void {
    this.router.use('/api/v1', AuthRest)
  }
}

export default new RestHttp().router
