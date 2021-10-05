import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Response } from 'express'
import httpStatus from 'http-status'
import { AuthInterface } from '../interface/config'
import { LoginOutput } from '../db/models/Users'
import { ExceptionsInterface, WithDataInterface } from '../interface/response'

class Authentication {
  public static passwordHash = (password: string): Promise<string> => bcrypt.hash(password, 10)

  public static passwordCompare = async (text: string, encryptedText: string): Promise<boolean> => {
    const result = await bcrypt.compare(text, encryptedText)
    return result
  }

  public static generateToken = (id: number): string => {
    const addSecretKey: AuthInterface = {
      secretKey: process.env.JWT_SECRET_KEY!,
      token: jwt.sign({ id }, process.env.JWT_SECRET_KEY!, {
        expiresIn: '8d' // set exipre token
      })
    }

    return addSecretKey.token!
  }

  public static validateUsername = async (
    result: LoginOutput, username:string, password: string, res: Response
  ) : Promise<Response> => {
    if (result) {
      // check password
      const compare = await this.passwordCompare(password, result.password!)
      if (compare) {
        const token: string = this.generateToken(result.id!)
        const message: WithDataInterface = {
          status: 'authenticated',
          message: 'login sucess',
          data: { token }
        }
        return res.status(httpStatus.OK).json(message)
      }
      const messages: ExceptionsInterface = {
        message: 'error !',
        error: 'Password incorect !'
      }
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json(messages)
    }
    const messages: ExceptionsInterface = {
      message: 'not found',
      error: `users ${username} not found`
    }
    return res.status(httpStatus.NOT_FOUND).json(messages)
  }
}

export default Authentication
