/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'

interface BaseHandlerInterface {
  read(req: Request, res: Response): Response | Promise<Response>
}

export default BaseHandlerInterface
