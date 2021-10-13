import { Request, Response } from 'express'
import httpStatus from 'http-status'
import {
  DeleteBoolInterface, ExceptionsInterface, PaginationResponseInterface, WithDataInterface
} from '../../../interface/response'
import UsersUsecase from '../../../usecase/users_usecase'
import { BaseHandlerInterface } from '../../../interface/handler'
import JsonMessage from '../../../utils/json'
import { _meta, RequestMetaInterface, RequestParamsInterface } from '../../../interface/request'
import { UsersInput, UsersOuput } from '../../../db/models/Users'
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
      const input: UsersInput = {
        username,
        password: hashedPassword,
        email,
        created_at: Custom.createdAt(),
        updated_at: Custom.updatedAt()
      }
      const result: UsersOuput = await this.usecase.create(input)
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
      return JsonMessage.succesWithMetaResponse(req, res, result)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  hardDelete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const params: RequestParamsInterface = {
        id: +req.params.id
      }
      const result: DeleteBoolInterface = await this.usecase.hardDelete(params)
      if (!result.status) {
        const messages: ExceptionsInterface = {
          message: 'not found',
          error: `data with id ${params.id} not found`
        }
        return JsonMessage.customErrorResponse(res, httpStatus.NOT_FOUND, messages)
      }
      const message: WithDataInterface = {
        status: 'deleted',
        message: `data with id ${params.id} sucessfully deleted`,
        data: result.status
      }
      return JsonMessage.successNoMetaResponse(res, message)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }
}

export default new UsersHandler()
