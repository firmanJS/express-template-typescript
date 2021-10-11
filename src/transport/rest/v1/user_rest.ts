import BaseRest from '../base'
import UsersHandler from '../handler/users_handler'

class UserRest extends BaseRest {
  public routes(): void {
    this.router.get('/', UsersHandler.read)
  }
}

export default new UserRest().router
