import { Response } from 'express'
import httpStatus from 'http-status'
import { ExceptionsInterface, WithDataInterface } from '../interface/response'

class JsonMessage {
  catchResponse = (error: any, res: Response): Response => {
    const result: ExceptionsInterface = {
      message: 'error !',
      error: error.toString()
    }
    return res.status(httpStatus.BAD_REQUEST).json(result)
  }

  customErrorResponse = (res: Response, status:number, message:WithDataInterface): Response => {
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

  successResponse = (res: Response, message:WithDataInterface): Response => {
    const result: WithDataInterface = message
    return res.status(httpStatus.CREATED).json(result)
  }
}

export default new JsonMessage()
