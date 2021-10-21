import { Request, Response } from 'express'
import { RegisterOutput, LoginOutput } from '../../../db/models/Users'
import AuthUsecase from '../../../usecase/auth_usecase'
import Authentication from '../../../utils/authentication'
import Custom from '../../../utils/custom'
import JsonMessage from '../../../utils/json'
import { AuthHandlerInterface } from '../../../interface/handler'

class AuthHandler implements AuthHandlerInterface {
  usecase: AuthUsecase

  constructor() {
    this.usecase = new AuthUsecase()
  }

  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password } = req.body
      const hashedPassword: string = await Authentication.passwordHash(password)
      const result: RegisterOutput = await this.usecase.register({
        username, password: hashedPassword, created_at: Custom?.createdAt()!
      })
      const message:string = 'new user has been sucessfully registered'
      return JsonMessage.successResponse(res, 'created', message, result)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password } = req.body
      const result: LoginOutput = await this.usecase.login({ username })
      const check: Response = await Authentication.validateUsername(result, username, password, res)
      return check
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  // profile = (req: Request, res: Response): Response => res.send(req.app.locals.credential)
}

export default new AuthHandler()
