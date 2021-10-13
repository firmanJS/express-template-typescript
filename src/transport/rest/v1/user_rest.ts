import BaseRest from '../base'
import UsersHandler from '../handler/users_handler'
import { validateRegister } from '../../../middlewares/validation/auth_validator'
import { tokenValidation } from '../../../middlewares/auth'

class UserRest extends BaseRest {
  public routes(): void {
    this.router.post('/', tokenValidation, validateRegister, UsersHandler.create)
    this.router.get('/', tokenValidation, UsersHandler.read)
    this.router.delete('/:id', tokenValidation, UsersHandler.hardDelete)
  }
}

export default new UserRest().router
