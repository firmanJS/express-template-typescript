/* eslint-disable no-unused-vars */
import { LoginInput, LoginOutput, RegisterOutput } from '../../db/models/Users'

interface AuthRepositoryInterface {
  register(payload: RegisterOutput): Promise<RegisterOutput>
  login(requestDto: LoginInput): Promise<LoginOutput>
}

export default AuthRepositoryInterface
