/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'

interface AuthHandlerInterface {
  register(req: Request, res: Response): Promise<Response>
  login(req: Request, res: Response): Promise<Response>
}

export default AuthHandlerInterface
