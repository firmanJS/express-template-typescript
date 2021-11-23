import { Request, Response } from 'express'
import { AuthPostgres } from '../../repository/postgres'
import Authentication from '../../utils/authentication'
import Custom from '../../utils/custom'
import JsonMessage from '../../utils/json'
import { AuthHandlerInterface } from '../../interface/handler'
import Lang from '../../lang'

class AuthHandler implements AuthHandlerInterface {
  private repository: AuthPostgres = new AuthPostgres()

  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password } = req.body
      const hashedPassword: string = await Authentication.passwordHash(password)
      const result = await this.repository.register({
        username, password: hashedPassword, created_at: Custom?.createdAt()!
      })
      const message:string = Lang.__('register.success')
      return JsonMessage.successResponse(res, 'created', message, result)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password } = req.body
      const result = await this.repository.login({ username })
      const check = await Authentication.validateUsername(result, username, password, res)
      return check
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }
}

export default new AuthHandler()
