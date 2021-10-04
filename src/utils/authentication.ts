import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthInterface } from '../interface/config'

class Authentication {
  public static passwordHash = (password: string): Promise<string> => bcrypt.hash(password, 10)

  public static passwordCompare = async (text: string, encryptedText: string): Promise<boolean> => {
    const result = await bcrypt.compare(text, encryptedText)
    return result
  }

  public static generateToken = (id: number, username: string, password: string): string => {
    const addSecretKey: AuthInterface = {
      secretKey: process.env.JWT_SECRET_KEY!,
      token: jwt.sign({ id, username, password }, process.env.JWT_SECRET_KEY!)
    }

    return addSecretKey.token!
  }
}

export default Authentication
