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
    const rows: RegisterOutput = await this.repository.register(payload)

    const result: RegisterOutput = {
      username: rows.username,
      email: rows.email,
      created_at: rows.created_at
    }

    return result
  }

  login = async (payload: LoginInput): Promise<LoginOutput> => {
    const rows: LoginOutput = await this.repository.login(payload)

    const result: LoginOutput = {
      id: rows.id,
      password: rows.password
    }

    return result
  }

  // profile = (req: Request, res: Response): Response => res.send(req.app.locals.credential)
}

export default AuthUsecase
