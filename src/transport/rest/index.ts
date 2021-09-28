import AuthRest from './AuthRest'
import BaseRest from './BaseRest'

class RestHttp extends BaseRest {
  public routes(): void {
    this.router.use('/api/v1', AuthRest)
  }
}

export default new RestHttp().router
