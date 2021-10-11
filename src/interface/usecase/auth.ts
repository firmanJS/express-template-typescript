/* eslint-disable no-unused-vars */
import {
  RegisterInput, RegisterOutput, LoginInput, LoginOutput
} from '../../db/models/Users'

interface AuthUsecaseInterface {
  register(payload: RegisterInput): Promise<RegisterOutput>
  login(payload: LoginInput): Promise<LoginOutput>
}

export default AuthUsecaseInterface
