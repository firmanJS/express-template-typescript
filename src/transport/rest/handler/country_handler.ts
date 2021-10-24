import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import {
  ResultBoolInterface, PaginationResponseInterface
} from '../../../interface/response'
import { CountryUsecase } from '../../../usecase'
import { BaseHandlerInterface } from '../../../interface/handler'
import JsonMessage from '../../../utils/json'
import { Meta, RequestMetaInterface, RequestParamsInterface } from '../../../interface/request'
import { CountryInput, CountryOuput } from '../../../db/models/Country'
import Custom from '../../../utils/custom'
import Lang from '../../../lang'

class CountryHandler implements BaseHandlerInterface {
  usecase: CountryUsecase

  constructor() {
    this.usecase = new CountryUsecase()
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const input: CountryInput = req.body
      input.id = uuidv4()
      input.created_at = Custom.createdAt()
      input.updated_at = Custom.updatedAt()
      const result: CountryOuput = await this.usecase.create(input)
      const message: string = Lang.__('created.success')
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
        id: req.params.id
      }
      const result: CountryOuput = await this.usecase.readByParam(params)
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
        id: req.params.id
      }
      const input: CountryInput = req.body
      input.updated_at = Custom.updatedAt()

      const result: ResultBoolInterface = await this.usecase.update(params, input)
      if (!result.status) {
        const message: string = Lang.__('not_found.id', { id: params.id!.toString() })
        return JsonMessage.NotFoundResponse(res, message)
      }
      const message: string = Lang.__('updated.success', { id: params.id!.toString() })
      return JsonMessage.successResponse(res, Lang.__('updated'), message, input)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  hardDelete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const params: RequestParamsInterface = {
        id: req.params.id
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

export default new CountryHandler()
