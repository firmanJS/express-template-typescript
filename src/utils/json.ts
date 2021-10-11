import { Request, Response } from 'express'
import httpStatus from 'http-status'
import {
  ExceptionsInterface, WithDataInterface, WithMetaInterface, PaginationResponseInterface
} from '../interface/response'
import { _meta } from '../interface/request'

class JsonMessage {
  catchResponse = (error: any, res: Response): Response => {
    const result: ExceptionsInterface = {
      message: 'error !',
      error: error.toString()
    }
    return res.status(httpStatus.BAD_REQUEST).json(result)
  }

  customErrorResponse = (res: Response, status: number, message: WithDataInterface): Response => {
    const result: ExceptionsInterface = message
    return res.status(status).json(result)
  }

  createdResponse = (res: Response, message: string, data: object): Response => {
    const result: WithDataInterface = {
      status: 'created !',
      message,
      data
    }
    return res.status(httpStatus.CREATED).json(result)
  }

  successNoMetaResponse = (res: Response, message: WithDataInterface): Response => {
    const result: WithDataInterface = message
    return res.status(httpStatus.OK).json(result)
  }

  succesWithMetaResponse = (req: Request, res: Response,
    result: PaginationResponseInterface): Response => {
    const { page, limit } = _meta(req)
    const totalPage: number = Math.ceil(result.count! / limit)
    const countPerPage: number = 10

    const response: WithMetaInterface = {
      status: 'success',
      message: 'Get data successfull',
      data: result.data,
      _link: req.url,
      _meta: {
        current_page: 1,
        page,
        limit_per_page: limit,
        total_page: totalPage,
        count_per_page: countPerPage,
        count_total: result.count
      }
    }
    return res.status(httpStatus.OK).json(response)
  }
}

export default new JsonMessage()
