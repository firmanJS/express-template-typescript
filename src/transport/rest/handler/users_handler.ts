import { Request, Response } from 'express'
import {
  ResultBoolInterface, PaginationResponseInterface, DataInterface
} from '../../../interface/response'
import { UsersUsecase } from '../../../usecase'
import { BaseHandlerInterface } from '../../../interface/handler'
import JsonMessage from '../../../utils/json'
import Lang from '../../../lang'

class UsersHandler implements BaseHandlerInterface {
  usecase: UsersUsecase

  constructor() {
    this.usecase = new UsersUsecase()
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result: DataInterface = await this.usecase.create(req)
      const message: string = Lang.__('created.success')
      return JsonMessage.successResponse(res, Lang.__('created'), message, result.data!)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  read = async (req:Request, res: Response): Promise<Response> => {
    try {
      const result: PaginationResponseInterface = await this.usecase.read(req)
      return JsonMessage.succesWithMetaResponse(req, res, result)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  readByParam = async (req:Request, res: Response): Promise<Response> => {
    try {
      const id: string = req?.params?.id.toString()
      const result: DataInterface = await this.usecase.readByParam(req)
      if (!result.data) {
        const message: string = Lang.__('not_found.id', { id })
        return JsonMessage.NotFoundResponse(res, message)
      }
      const message: string = Lang.__('get.id', { id })
      return JsonMessage.successResponse(res, Lang.__('get'), message, result.data!)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: string = req?.params?.id.toString()
      const { body } = req
      const result: ResultBoolInterface = await this.usecase.update(req)
      if (!result.status) {
        const message: string = Lang.__('not_found.id', { id })
        return JsonMessage.NotFoundResponse(res, message)
      }
      const message: string = Lang.__('updated.success', { id })
      return JsonMessage.successResponse(res, Lang.__('updated'), message, body)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  hardDelete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: string = req?.params?.id.toString()
      const result: ResultBoolInterface = await this.usecase.hardDelete(req)
      if (!result.status) {
        const message: string = Lang.__('not_found.id', { id })
        return JsonMessage.NotFoundResponse(res, message)
      }
      const message: string = Lang.__('delete.id', { id })
      return JsonMessage.successResponse(res, Lang.__('deleted'), message, result)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }
}

export default new UsersHandler()
