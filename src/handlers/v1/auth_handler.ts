import { Request, Response } from 'express'
import { UsersRepository } from '../../repository/postgres'
import Authentication from '../../utils/authentication'
import Custom from '../../utils/custom'
import JsonMessage from '../../utils/json'
import { AuthHandlerInterface } from '../../interface/handler'
import Lang from '../../lang'
import { DefaultAttributes } from '../../db/models/Users'

class AuthHandler implements AuthHandlerInterface {
  private repository: UsersRepository = new UsersRepository()

  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password } = req.body
      const hashedPassword: string = await Authentication.passwordHash(password)
      const result = await this.repository.create({
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
      const result = await this.repository.readByParam({ username }, DefaultAttributes)
      const check = await Authentication.validateUsername(result.data!, username, password, res)
      return check
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }
}

export default new AuthHandler()
