import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { RegisterOutput, LoginOutput } from '../db/models/Users'
import AuthInterface from '../interface/auth'
import { ExceptionsInterface, WithDataInterface } from '../interface/response'
import AuthRepository from '../repository/auth_repository'
import Authentication from '../utils/authentication'
import Custom from '../utils/custom'

class AuthUsecase implements AuthInterface {
  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service = new AuthRepository(req)
      const { username, password } = req.body
      const hashedPassword: string = await Authentication.passwordHash(password)
      const result: RegisterOutput = await service.register({
        username, password: hashedPassword, created_at: Custom.createdAt()
      })
      const message: WithDataInterface = {
        status: 'created !',
        message: 'new user has been sucessfully registered',
        data: result
      }
      return res.status(httpStatus.CREATED).json(message)
    } catch (error: any) {
      const result: ExceptionsInterface = {
        message: 'error !',
        error: error.toString()
      }
      return res.status(httpStatus.BAD_REQUEST).json(result)
    }
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body
    const service = new AuthRepository(req)
    try {
      const result: LoginOutput = await service.login({ username })
      const validateLogin = await Authentication.validateUsername(result, username, password, res)
      return validateLogin
    } catch (error: any) {
      const result: ExceptionsInterface = {
        message: 'error !',
        error: error.toString()
      }
      return res.status(httpStatus.BAD_REQUEST).json(result)
    }
  }

  // profile = (req: Request, res: Response): Response => res.send(req.app.locals.credential)
}

export default new AuthUsecase()
