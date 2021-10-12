import {
  RegisterOutput, RegisterInput, LoginInput, LoginOutput
} from '../db/models/Users'
import { AuthUsecaseInterface } from '../interface/usecase'
import { AuthPostgres } from '../repository/postgres'

class AuthUsecase implements AuthUsecaseInterface {
  repository: AuthPostgres

  constructor() {
    this.repository = new AuthPostgres()
  }

  register = async (payload: RegisterInput): Promise<RegisterOutput> => {
    const result: RegisterOutput = await this.repository.register(payload)
    return result
  }

  login = async (payload: LoginInput): Promise<LoginOutput> => {
    const result: LoginOutput = await this.repository.login(payload)
    return result
  }

  // profile = (req: Request, res: Response): Response => res.send(req.app.locals.credential)
}

export default AuthUsecase
