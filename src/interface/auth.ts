/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'

interface AuthInterface {
  register(req: Request, res: Response): Response | Promise<Response>
  login(req: Request, res: Response): Response | Promise<Response>
}

export default AuthInterface
