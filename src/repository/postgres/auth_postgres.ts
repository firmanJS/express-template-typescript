import { Users } from '../../db/models'
import {
  RegisterInput, RegisterOutput, LoginInput, LoginOutput
} from '../../db/models/Users'

class AuthRepository {
  register = async (formData: RegisterInput): Promise<RegisterOutput> => {
    const rows: RegisterOutput = await Users.create(formData)
    const response: RegisterOutput = {
      username: rows.username,
      email: rows.email,
      created_at: rows.created_at
    }

    return response
  }

  login = async (formData: LoginInput): Promise<LoginOutput> => {
    const response: any = await Users.findOne({
      where: { username: formData.username },
      attributes: ['id', 'password']
    })

    return response
  }
}

export default AuthRepository
