/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'

interface HealthHandlerInterface {
  checkServer(req: Request, res: Response): Promise<Response>
  checkDatabase(req: Request, res: Response): Promise<Response>
}

export default HealthHandlerInterface
