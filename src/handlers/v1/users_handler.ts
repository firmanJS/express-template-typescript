import { Request, Response } from 'express'
import { UsersRepository } from '../../repository/postgres'
import { BaseHandlerInterface } from '../../interface/handler'
import Lang from '../../lang'
import { Meta } from '../../interface/request'
import { DefaultAttributes, UsersAttributes, UsersInput } from '../../db/models/Users'
import { Authentication, Custom, JsonMessage } from '../../utils'
import { PaginationResponseInterface } from '../../interface/response'

class UsersHandler implements BaseHandlerInterface {
  private repository: UsersRepository = new UsersRepository()

  protected readRequest = (req: Request) => {
    const payload: UsersInput = req?.body
    const id: string = req?.params?.id
    const params: UsersAttributes = req?.params

    return { payload, id, params }
  }

  constructor() {
    this.repository = new UsersRepository()
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { payload } = this.readRequest(req)

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
      const response: PaginationResponseInterface = {
        rows: result.data!,
        count: result.count!,
      }
      return JsonMessage.succesWithMetaResponse(req, res, response)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  readByParam = async (req:Request, res: Response): Promise<Response> => {
    try {
      const { id, params } = this.readRequest(req)
      const idTostring: string = id.toString()
      const result = await this.repository.readByParam(params, DefaultAttributes)
      if (!result.data) {
        const message: string = Lang.__('not_found.id', { idTostring })
        return JsonMessage.NotFoundResponse(res, message)
      }
      const message: string = Lang.__('get.id', { idTostring })
      return JsonMessage.successResponse(res, Lang.__('get'), message, result.data!)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id, params, payload } = this.readRequest(req)
      const idTostring: string = id.toString()

      if (payload.password) {
        const hashedPassword: string = await Authentication.passwordHash(payload.password)
        payload.password = hashedPassword
      }
      payload.updated_at = Custom.updatedAt()

      const result = await this.repository.update(params, payload)
      if (!result.status) {
        const message: string = Lang.__('not_found.id', { idTostring })
        return JsonMessage.NotFoundResponse(res, message)
      }
      const message: string = Lang.__('updated.success', { idTostring })
      return JsonMessage.successResponse(res, Lang.__('updated'), message, payload)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  hardDelete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id, params } = this.readRequest(req)
      const idTostring: string = id.toString()
      const result = await this.repository.hardDelete(params)
      if (!result.status) {
        const message: string = Lang.__('not_found.id', { idTostring })
        return JsonMessage.NotFoundResponse(res, message)
      }
      const message: string = Lang.__('delete.id', { idTostring })
      return JsonMessage.successResponse(res, Lang.__('deleted'), message, result)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }
}

export default new UsersHandler()
