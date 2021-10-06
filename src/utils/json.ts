import { Response } from 'express'
import httpStatus from 'http-status'
import { ExceptionsInterface } from '../interface/response'

class JsonMessage {
  catchResponse = (error: any, res: Response): Response => {
    const result: ExceptionsInterface = {
      message: 'error !',
      error: error.toString()
    }
    return res.status(httpStatus.BAD_REQUEST).json(result)
  }
}

export default new JsonMessage()
