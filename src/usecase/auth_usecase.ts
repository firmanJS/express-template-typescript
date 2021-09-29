import { Request, Response } from 'express'
import { RegisterOutput } from '../db/models/Users'
import RegisterInterface from '../interface/register'
import { ExceptionsInterface, WithDataInterface } from '../interface/response'
import AuthRepository from '../repository/auth_repository'
import Authentication from '../utils/authentication'

class AuthUsecase implements RegisterInterface {
  register = async (req: Request, res: Response): Promise<Response> => {
    const service = new AuthRepository(req)
    try {
      const { username, password } = req.body
      const hashedPassword: string = await Authentication.passwordHash(password)
      const result: RegisterOutput = await service.register({ username, password: hashedPassword })
      const message: WithDataInterface = {
        status: 'created !',
        message: 'new user has been sucessfully registered',
        data: result
      }
      return res.status(201).json(message)
    } catch (error) {
      const result: ExceptionsInterface = {
        message: 'error !',
        error: error.toString()
      }
      return res.status(400).json(result)
    }
  }

  // login = async (req: Request, res: Response): Promise<Response> => {
  //   // cari data user by username
  //   const { username, password } = req.body

  //   const user = await db.user.findOne({
  //     where: { username },
  //   })

  //   // check password
  //   const compare = await Authentication.passwordCompare(password, user.password)

  //   // generate token
  //   if (compare) {
  //     const token = Authentication.generateToken(user.id, username, user.password)
  //     return res.send({
  //       token,
  //     })
  //   }

  //   return res.send('auth failed')
  // }

  // profile = (req: Request, res: Response): Response => res.send(req.app.locals.credential)
}

export default new AuthUsecase()
