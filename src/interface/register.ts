import { Request, Response } from 'express'

interface RegisterInterface {
  register(req: Request, res: Response): Response | Promise<Response>
}

export default RegisterInterface
