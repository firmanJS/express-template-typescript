import { Users } from '../../db/models'
import {
  RegisterInput, RegisterOutput, LoginInput, LoginOutput
} from '../../db/models/Users'
import { AuthRepositoryInterface } from '../../interface/repository'

class AuthRepository implements AuthRepositoryInterface {
  register = async (payload: RegisterInput): Promise<RegisterOutput> => {
    const rows = await Users.create(payload)
    return rows
  }

  login = async (payload: LoginInput): Promise<LoginOutput> => {
    const response = await Users.findOne({
      where: { username: payload.username },
      attributes: ['id', 'password']
    })

    return response!
  }
}

export default AuthRepository
