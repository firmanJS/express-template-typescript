/* eslint-disable no-unused-vars */
import { RegisterInput, RegisterOutput, LoginInput } from '../../db/models/Users'

interface AuthUsecaseInterface {
  register(payload: RegisterInput): Promise<RegisterOutput>
  login(payload: LoginInput): Promise<any>
}

export default AuthUsecaseInterface
