import HealthRest from './health_rest'
import AuthRest from './auth_rest'
import UserRest from './user_rest'
import CountryRest from './country_rest'
import BaseRest from '../base'

class RestHttp extends BaseRest {
  public routes(): void {
    this.router.use('/api/v1', HealthRest)
    this.router.use('/api/v1', AuthRest)
    this.router.use('/api/v1/users', UserRest)
    this.router.use('/api/v1/country', CountryRest)
  }
}

export default new RestHttp().router
