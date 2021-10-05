import { Request } from 'express'
import { Users } from '../db/models'
import {
  RegisterInput, RegisterOutput, LoginInput, LoginOutput
} from '../db/models/Users'

class AuthRepository {
  body: Request['body']

  params: Request['params']

  constructor(req: Request) {
    this.body = req.body
    this.params = req.params
  }

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

export default AuthRepository
