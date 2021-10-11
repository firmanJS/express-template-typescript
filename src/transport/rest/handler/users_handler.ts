import { Request, Response } from 'express'
import { PaginationResponseInterface } from '../../../interface/response'
import UsersUsecase from '../../../usecase/users_usecase'
import { BaseHandlerInterface } from '../../../interface/handler'
import JsonMessage from '../../../utils/json'
import { _meta } from '../../../interface/request'

class UsersHandler implements BaseHandlerInterface {
  usecase: UsersUsecase

  constructor() {
    this.usecase = new UsersUsecase()
  }

  read = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { limit, offset } = _meta(req)
      const result: PaginationResponseInterface = await this.usecase.read(limit, offset)
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
