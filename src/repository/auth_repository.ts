import { Request } from 'express'
import { Users } from '../db/models'
import { RegisterInput, RegisterOutput } from '../db/models/Users'

class AuthRepository {
  body: Request['body']

  params: Request['params']

  constructor(req: Request) {
    this.body = req.body
    this.params = req.params
  }

  register = async (formData: RegisterInput): Promise<RegisterOutput> => {
    const register: RegisterOutput = await Users.create(formData)
    return {
      username: register.username,
      email: register.email,
    }
  }
}

export default AuthRepository
