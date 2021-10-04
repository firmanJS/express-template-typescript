import { Request, Response } from 'express'

interface RegisterInterface {
  register(_req: Request, _res: Response): Response | Promise<Response>
}

export default RegisterInterface
