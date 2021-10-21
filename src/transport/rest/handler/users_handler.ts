import { Request, Response } from 'express'
import {
  ResultBoolInterface, PaginationResponseInterface
} from '../../../interface/response'
import UsersUsecase from '../../../usecase/users_usecase'
import { BaseHandlerInterface } from '../../../interface/handler'
import JsonMessage from '../../../utils/json'
import { Meta, RequestMetaInterface, RequestParamsInterface } from '../../../interface/request'
import { UsersInput, UsersOuput } from '../../../db/models/Users'
import Authentication from '../../../utils/authentication'
import Custom from '../../../utils/custom'
import Lang from '../../../lang'

class UsersHandler implements BaseHandlerInterface {
  usecase: UsersUsecase

  constructor() {
    this.usecase = new UsersUsecase()
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const input: UsersInput = req.body
      input.password = await Authentication.passwordHash(input.password!)
      input.created_at = Custom.createdAt()
      input.updated_at = Custom.updatedAt()
      const result: UsersOuput = await this.usecase.create(input)
      const message: string = Lang.__('register.success')
      return JsonMessage.successResponse(res, Lang.__('created'), message, result)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  read = async (req:Request, res: Response): Promise<Response> => {
    try {
      const meta: RequestMetaInterface = Meta(req)
      const result: PaginationResponseInterface = await this.usecase.read(meta)
      return JsonMessage.succesWithMetaResponse(req, res, result)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  readByParam = async (req:Request, res: Response): Promise<Response> => {
    try {
      const params: RequestParamsInterface = {
        id: +req.params.id
      }
      const result: UsersOuput = await this.usecase.readByParam(params)
      if (!result) {
        const message: string = Lang.__('not_found.id', { id: params.id!.toString() })
        return JsonMessage.NotFoundResponse(res, message)
      }
      const message: string = Lang.__('get.id', { id: params.id!.toString() })
      return JsonMessage.successResponse(res, Lang.__('get'), message, result)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const params: RequestParamsInterface = {
        id: +req.params.id
      }
      const input: UsersInput = req.body
      if (input.password) {
        const hashedPassword: string = await Authentication.passwordHash(input.password)
        input.password = hashedPassword
      }
      input.updated_at = Custom.updatedAt()

      const result: ResultBoolInterface = await this.usecase.update(params, input)
      if (!result.status) {
        const message: string = Lang.__('not_found.id', { id: params.id!.toString() })
        return JsonMessage.NotFoundResponse(res, message)
      }
      const message: string = Lang.__('update.success', { id: params.id!.toString() })
      return JsonMessage.successResponse(res, Lang.__('updated'), message, input)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  hardDelete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const params: RequestParamsInterface = {
        id: +req.params.id
      }
      const result: ResultBoolInterface = await this.usecase.hardDelete(params)
      if (!result.status) {
        const message: string = Lang.__('not_found.id', { id: params.id!.toString() })
        return JsonMessage.NotFoundResponse(res, message)
      }
      const message: string = Lang.__('delete.id', { id: params.id!.toString() })
      return JsonMessage.successResponse(res, Lang.__('deleted'), message, result)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }
}

export default new UsersHandler()
