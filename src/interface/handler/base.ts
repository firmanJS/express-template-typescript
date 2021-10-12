/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'

interface BaseHandlerInterface {
  create(req: Request, res: Response): Response | Promise<Response>
  read(req: Request, res: Response): Response | Promise<Response>
}

export default BaseHandlerInterface
