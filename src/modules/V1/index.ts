import AuthRest from './auth'
import BaseRest from './base'

class RestHttp extends BaseRest {
  public routes(): void {
    this.router.use('/api/v1', AuthRest)
  }
}

export default new RestHttp().router
