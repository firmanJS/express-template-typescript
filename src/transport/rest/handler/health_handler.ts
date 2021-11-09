import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { dbConnection } from '../../../config/database'
import JsonMessage from '../../../utils/json'
import { HealthHandlerInterface } from '../../../interface/handler'
import Lang from '../../../lang'
import { DatabaseInterface, MongoOptionsInterface } from '../../../interface/config'
import { clientConfig } from '../../../config/redis'

const configMongo: DatabaseInterface = {
  mongoUrl: process.env.MONGO_URL!
}
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

  checkDatabaseMongo = async (req: Request, res: Response): Promise<Response> => {
    try {
      const options: MongoOptionsInterface = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
        maxPoolSize: 50,
        wtimeoutMS: 2500,
      }
      await mongoose.connect(configMongo.mongoUrl!, options)
      const data: HealthInterface = {
        uptime: process.uptime(),
        message: 'MongoDB Connected...',
        date: new Date().toISOString(),
      }
      return JsonMessage.successResponse(res, Lang.__('success'), Lang.__('uptime.database'), data)
    } catch (error: any) {
      const manipulate: string = error.toString().split(':')
      const message: string = `${manipulate[0]}: Mongo is disconnected`
      return JsonMessage.catchResponse(message, res)
    }
  }

  checkDatabaseRedis = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data: HealthInterface = {
        uptime: process.uptime(),
        message: clientConfig.connected.toString(),
        date: new Date().toISOString(),
      }
      return JsonMessage.successResponse(res, Lang.__('success'), Lang.__('uptime.database'), data)
    } catch (error: any) {
      return JsonMessage.catchResponse(error, res)
    }
  }
}

export default new HealthHandler()
