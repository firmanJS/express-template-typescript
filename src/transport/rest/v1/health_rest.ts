import BaseRest from '../base'
import { HealthHandler } from '../../../handlers/v1'

class HealthRest extends BaseRest {
  public routes(): void {
    this.router.get('/health-check-server', HealthHandler.checkServer)
    this.router.get('/health-check-database-postgres', HealthHandler.checkDatabasePostgres)
    this.router.get('/health-check-elastic', HealthHandler.checkElastic)
  }
}

export default new HealthRest().router
