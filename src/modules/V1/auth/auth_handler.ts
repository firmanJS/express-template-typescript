/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import { DefaultAttributes } from '../../../db/models/Users'
import { Authentication, Custom, JsonMessage } from '../../../utils'
import UsersRepository from './users_repository_postgres'
import Lang from '../../../lang'

interface AuthHandlerInterface {
  register(req: Request, res: Response): Promise<Response>
  login(req: Request, res: Response): Promise<Response>
}

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
