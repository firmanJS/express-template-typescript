import { Request, Response } from 'express'
import dbConnection from '../../../config/database'
import JsonMessage from '../../../utils/json'
import { HealthHandlerInterface } from '../../../interface/handler'

interface HealthInterface {
  uptime?:number
  message: string
  date?:string
}
class HealthHandler implements HealthHandlerInterface {
  checkServer = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data: HealthInterface = {
        uptime: process.uptime(),
        message: 'ok',
        date: new Date().toISOString(),
      }
      return JsonMessage.successResponse(res, 'success', 'uptime server', data)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  checkDatabase = async (req: Request, res: Response): Promise<Response> => {
    try {
      const check: any[] = await dbConnection.query('SELECT 1 as result')

      const data: HealthInterface = {
        uptime: process.uptime(),
        message: check[0],
        date: new Date().toISOString(),
      }
      return JsonMessage.successResponse(res, 'success', 'uptime database', data)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }
}

export default new HealthHandler()
