import { Users } from '../../db/models'
import {
  RegisterInput, RegisterOutput, LoginInput, LoginOutput
} from '../../db/models/Users'
import { AuthUsecaseInterface } from '../../interface/usecase'

class AuthRepository implements AuthUsecaseInterface {
  register = async (payload: RegisterInput): Promise<RegisterOutput> => {
    const rows: RegisterOutput = await Users.create(payload)
    return rows
  }

  login = async (payload: LoginInput): Promise<LoginOutput> => {
    const response: any = await Users.findOne({
      where: { username: payload.username },
      attributes: ['id', 'password']
    })

    return response
  }
}

export default AuthRepository
