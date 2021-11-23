import BaseRest from '../base'
import { CountryHandler } from '../../../handlers/v1'
import { tokenValidation } from '../../../middlewares/auth'

class UserRest extends BaseRest {
  public routes(): void {
    this.router.post('/', tokenValidation, CountryHandler.create)
    this.router.get('/', tokenValidation, CountryHandler.read)
    this.router.get('/:id', tokenValidation, CountryHandler.readByParam)
    this.router.put('/:id', tokenValidation, CountryHandler.update)
    this.router.delete('/:id', tokenValidation, CountryHandler.hardDelete)
  }
}

export default new UserRest().router
