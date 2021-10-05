/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'

interface AuthInterface {
  register(_req: Request, _res: Response): Response | Promise<Response>
  login(_req: Request, _res: Response): Response | Promise<Response>
}

export default AuthInterface
