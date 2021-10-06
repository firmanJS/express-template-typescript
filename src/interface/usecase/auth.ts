/* eslint-disable no-unused-vars */
import { RegisterInput, LoginInput } from '../../db/models/Users'

interface AuthUsecaseInterface {
  register(payload: RegisterInput): Promise<any>
  login(payload: LoginInput): Promise<any>
}

export default AuthUsecaseInterface
