import { Request, Response } from 'express'
import { UsersRepositoryMongo } from '../../repository/mongo'
import { BaseHandlerInterface } from '../../interface/handler'
import JsonMessage from '../../utils/json'
import Lang from '../../lang'
import { Meta } from '../../interface/request'
import { UsersOutput, UsersInput } from '../../db/models/Users'
import Authentication from '../../utils/authentication'
import Custom from '../../utils/custom'
import { PaginationResponseInterface } from '../../interface/response'

const readRequest = (req: Request) => {
  const payload: UsersInput = req?.body
  const _id: string = req?.params?.id
  const params: UsersOutput = req?.params

  return { payload, _id, params }
}

class UsersHandler implements BaseHandlerInterface {
  repository: UsersRepositoryMongo

  constructor() {
    this.repository = new UsersRepositoryMongo()
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const payload: UsersInput = req?.body
      payload.password = await Authentication.passwordHash(payload.password!)
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
      const { _id, params } = readRequest(req)
      const result = await this.repository.readByParam(params)

      if (!result.data) {
        const message: string = Lang.__('not_found.id', { _id })
        return JsonMessage.NotFoundResponse(res, message)
      }

      const message: string = Lang.__('get.id', { _id })
      return JsonMessage.successResponse(res, Lang.__('get'), message, result.data!)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { _id, params, payload } = readRequest(req)

      if (payload.password) {
        const hashedPassword: string = await Authentication.passwordHash(payload.password)
        payload.password = hashedPassword
      }

      payload.updated_at = Custom.updatedAt()

      const result = await this.repository.update(params, payload)
      if (!result.status) {
        const message: string = Lang.__('not_found.id', { _id })
        return JsonMessage.NotFoundResponse(res, message)
      }
      const message: string = Lang.__('updated.success', { _id })
      return JsonMessage.successResponse(res, Lang.__('updated'), message, payload)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  hardDelete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { _id, params } = readRequest(req)
      const result = await this.repository.hardDelete(params)
      if (!result.status) {
        const message: string = Lang.__('not_found.id', { _id })
        return JsonMessage.NotFoundResponse(res, message)
      }
      const message: string = Lang.__('delete.id', { _id })
      return JsonMessage.successResponse(res, Lang.__('deleted'), message, result)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }
}

export default new UsersHandler()
