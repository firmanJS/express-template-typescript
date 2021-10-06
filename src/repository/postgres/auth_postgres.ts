import { Users } from '../../db/models'
import {
  RegisterInput, RegisterOutput, LoginInput, LoginOutput
} from '../../db/models/Users'

class AuthPostgres {
  register = async (formData: RegisterInput): Promise<RegisterOutput> => {
    const res = await Users.create(formData)
    return {
      username: res.username,
      email: res.email,
      created_at: res.created_at
    }
  }

  login = async (formData: LoginInput): Promise<LoginOutput> => {
    const res = await Users.findOne({
      where: { username: formData.username },
      attributes: ['id', 'password']
    })
    return res!
  }
}

export default AuthPostgres
