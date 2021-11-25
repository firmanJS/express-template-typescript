import { Request, Response } from 'express'
import {
  PaginationResponseInterface,
  ResultBoolInterface
} from '../../interface/response'
import { CountryRepositoryMongo } from '../../repository/mongo'
import { BaseHandlerInterface } from '../../interface/handler'
import JsonMessage from '../../utils/json'
import Lang from '../../lang'
import Custom from '../../utils/custom'
import { CountryInput, CountryOuput } from '../../db/models/Country'
import { Meta } from '../../interface/request'

const readRequest = (req: Request) => {
  const payload: CountryInput = req?.body
  const id: string = req?.params?.id
  const params: CountryOuput = req?.params

  return { payload, id, params }
}

class CountryHandler implements BaseHandlerInterface {
  private repository: CountryRepositoryMongo = new CountryRepositoryMongo()

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { payload } = readRequest(req)

      payload.created_at = Custom.createdAt()
      payload.updated_at = Custom.updatedAt()

      const result = await this.repository.create(payload)
      const message: string = Lang.__('created.success')
      return JsonMessage.successResponse(res, Lang.__('created'), message, result!)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  read = async (req:Request, res: Response): Promise<Response> => {
    try {
      const meta = Meta(req)
      const result = await this.repository.read(meta)
      const mappingData: PaginationResponseInterface = {
        rows: result.data!,
        count: result.count!
      }
      return JsonMessage.succesWithMetaResponse(req, res, mappingData)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  readByParam = async (req:Request, res: Response): Promise<Response> => {
    try {
      const { id, params } = readRequest(req)
      const result = await this.repository.readByParam(params)

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
      const { id, params, payload } = readRequest(req)

      payload.created_at = Custom.createdAt()
      payload.updated_at = Custom.updatedAt()

      const result: ResultBoolInterface = await this.repository.update(params, payload)

      if (!result.status) {
        const message: string = Lang.__('not_found.id', { id })
        return JsonMessage.NotFoundResponse(res, message)
      }

      const message: string = Lang.__('updated.success', { id })
      return JsonMessage.successResponse(res, Lang.__('updated'), message, payload)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  hardDelete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id, params } = readRequest(req)
      const result: ResultBoolInterface = await this.repository.hardDelete(params)

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

export default new CountryHandler()
