import { Request, Response } from 'express'
import { PaginationResponseInterface } from '../../../interface/response'
import UsersUsecase from '../../../usecase/users_usecase'
import { BaseHandlerInterface } from '../../../interface/handler'
import JsonMessage from '../../../utils/json'
import { _meta, RequestMetaInterface } from '../../../interface/request'
import { UsersOuput } from '../../../db/models/Users'
import Authentication from '../../../utils/authentication'
import Custom from '../../../utils/custom'

class UsersHandler implements BaseHandlerInterface {
  usecase: UsersUsecase

  constructor() {
    this.usecase = new UsersUsecase()
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password, email } = req.body
      const hashedPassword: string = await Authentication.passwordHash(password)
      const result: UsersOuput = await this.usecase.create({
        username,
        password: hashedPassword,
        email,
        created_at: Custom.createdAt(),
        updated_at: Custom.updatedAt()
      })
      const message:string = 'new user has been sucessfully registered'
      return JsonMessage.createdResponse(res, message, result)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  read = async (req:Request, res: Response): Promise<Response> => {
    try {
      const meta: RequestMetaInterface = _meta(req)
      const result: PaginationResponseInterface = await this.usecase.read(meta)
      const data: PaginationResponseInterface = {
        data: result.data,
        count: result.count
      }
      return JsonMessage.succesWithMetaResponse(req, res, data)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }
}

export default new UsersHandler()
