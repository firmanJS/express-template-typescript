import BaseRest from '../base'
import { HealthHandler } from '../handler'

class HealthRest extends BaseRest {
  public routes(): void {
    this.router.get('/health-check-server', HealthHandler.checkServer)
    this.router.get('/health-check-database', HealthHandler.checkDatabase)
  }
}

export default new HealthRest().router
