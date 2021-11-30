import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Response } from 'express'
import httpStatus from 'http-status'
import { AuthInterface } from '../interface/config'
import { UsersAttributes } from '../db/models/Users'
import { ExceptionsInterface, WithDataInterface } from '../interface/response'
import JsonMessage from './json'

export class Authentication {
  public static passwordHash = (password: string): Promise<string> => bcrypt.hash(password, 10)

  public static passwordCompare = async (text: string, encryptedText: string): Promise<boolean> => {
    const result: boolean = await bcrypt.compare(text, encryptedText)
    return result
  }

  public static generateToken = (id: number): string => {
    const expiresIn: string = process.env.JWT_EXPIRE_IN!
    const algorithm: any | string = process.env.JWT_ALGORITM!
    const secretKey: string = process.env.JWT_SECRET_KEY!

    const addSecretKey: AuthInterface = {
      secretKey,
      token: jwt.sign({ id }, secretKey, {
        expiresIn, algorithm
      })
    }

    return addSecretKey.token!
  }

  public static validateUsername = async (
    result: UsersAttributes, username:string, password: string, res: Response
  ) : Promise<Response> => {
    if (result) {
      // check password
      const compare: boolean = await this.passwordCompare(password, result.password!)
      if (compare) {
        const token: string = this.generateToken(result.id!)
        const message: WithDataInterface = {
          status: 'authenticated',
          message: 'login sucess',
          data: { token }
        }
        return JsonMessage.successNoMetaResponse(res, message)
      }
      const messages: ExceptionsInterface = {
        message: 'error !',
        error: 'Password incorect !'
      }
      const status: number = httpStatus.UNPROCESSABLE_ENTITY
      return JsonMessage.customErrorResponse(res, status, messages)
    }
    const messages: ExceptionsInterface = {
      message: 'not found',
      error: `users ${username} not found`
    }
    const status: number = httpStatus.NOT_FOUND
    return JsonMessage.customErrorResponse(res, status, messages)
  }
}
