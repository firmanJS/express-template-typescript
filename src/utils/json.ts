import { Request, Response } from 'express'
import httpStatus from 'http-status'
import {
  ExceptionsInterface, WithDataInterface, WithMetaInterface, PaginationResponseInterface
} from '../interface/response'
import { Meta } from '../interface/request'

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

  NotFoundResponse = (res: Response, message: string): Response => {
    const result: ExceptionsInterface = {
      message: 'not found.',
      error: message
    }

    return res.status(httpStatus.NOT_FOUND).json(result)
  }

  successResponse = (res: Response, status:string, message: string, data: object): Response => {
    let code: number = httpStatus.OK
    if (status === 'created') {
      code = httpStatus.CREATED
    } else {
      code = httpStatus.OK
    }
    const result: WithDataInterface = {
      status,
      message,
      data
    }
    return res.status(code).json(result)
  }

  successNoMetaResponse = (res: Response, message: WithDataInterface): Response => {
    const result: WithDataInterface = message
    return res.status(httpStatus.OK).json(result)
  }

  succesWithMetaResponse = (req: Request, res: Response,
    result: PaginationResponseInterface): Response => {
    const { page, limit } = Meta(req)
    const totalPage: number = Math.ceil(result.count! / limit)
    const countPerPage: number = Object.keys(result.rows!).length
    const response: WithMetaInterface = {
      status: 'success',
      message: 'Get data successfull',
      data: result.rows,
      _link: req.originalUrl,
      Meta: {
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
