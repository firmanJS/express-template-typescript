import { Request, Response } from 'express'
import { dbConnection } from '../../config/database'
import { JsonMessage } from '../../utils'
import { HealthHandlerInterface } from '../../interface/handler'
import elasticClient from '../../config/elastic'
import Lang from '../../lang'

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
      return JsonMessage.successResponse(res, Lang.__('success'), Lang.__('uptime.server'), data)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }

  checkDatabasePostgres = async (req: Request, res: Response): Promise<Response> => {
    try {
      const check: any[] = await dbConnection.query('SELECT 1 as result')

      const data: HealthInterface = {
        uptime: process.uptime(),
        message: check[0],
        date: new Date().toISOString(),
      }
      return JsonMessage.successResponse(res, Lang.__('success'), Lang.__('uptime.database'), data)
    } catch (error: any) {
      const manipulate: string = error.toString().split(':')
      const message: string = `${manipulate[0]}: Sequelize db is disconnected`
      return JsonMessage.catchResponse(message, res)
    }
  }

  checkElastic = async (req: Request, res: Response): Promise<Response> => {
    try {
      const check = await elasticClient.ping()

      const data: HealthInterface = {
        uptime: process.uptime(),
        message: `info status: ${check.statusCode}`,
        date: new Date().toISOString(),
      }
      return JsonMessage.successResponse(res, Lang.__('success'), Lang.__('uptime.database'), data)
    } catch (error: any) {
      const manipulate: string = error.toString().split(':')
      const message: string = `${manipulate[0]}: Elastic db is disconnected`
      return JsonMessage.catchResponse(message, res)
    }
  }
}

export default new HealthHandler()
