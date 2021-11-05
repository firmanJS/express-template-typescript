import { Request, Response } from 'express'
import httpStatus from 'http-status'
import {
  ExceptionsInterface, WithDataInterface, WithMetaInterface, PaginationResponseInterface
} from '../interface/response'
import { Meta } from '../interface/request'
import Lang from '../lang'

class JsonMessage {
  catchResponse = (error: any, res: Response): Response => {
    const manipulate: string = error.toString().split(':')
    let message: string

    if (manipulate[0] === 'SequelizeConnectionRefusedError') {
      message = `${manipulate[0]}: Sequelize db is disconnected`
    } else {
      message = error.toString()
    }

    const result: ExceptionsInterface = {
      message: Lang.__('error'),
      error: message
    }
    return res.status(httpStatus.BAD_REQUEST).json(result)
  }

  customErrorResponse = (res: Response, status: number, message: WithDataInterface): Response => {
    const result: ExceptionsInterface = message
    return res.status(status).json(result)
  }

  NotFoundResponse = (res: Response, message: string): Response => {
    const result: ExceptionsInterface = {
      message: Lang.__('not_found'),
      error: message
    }

    return res.status(httpStatus.NOT_FOUND).json(result)
  }

  successResponse = (res: Response, status:string, message: string, data: object): Response => {
    let code: number = httpStatus.OK
    if (status === Lang.__('created')) {
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
    const { limit } = Meta(req)
    const total_page: number = Math.ceil(result.count / limit)
    const response: WithMetaInterface = {
      status: Lang.__('success'),
      message: Lang.__('get.success'),
      data: result.rows,
      _link: req.originalUrl,
      meta: {
        current_page: 1,
        limit_per_page: limit,
        total_page,
        count_total: result.count
      }
    }
    return res.status(httpStatus.OK).json(response)
  }
}

export default new JsonMessage()
