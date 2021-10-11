import { Users } from '../../db/models'
import { UsersOuput } from '../../db/models/Users'
import { PaginationResponseInterface } from '../../interface/response'
import UsersUsecaseInterface from '../../interface/usecase/users'

class UsersRepository implements UsersUsecaseInterface {
  public column: [string, string, string, string, string, string]

  constructor() {
    this.column = ['id', 'username', 'password', 'email', 'created_at', 'updated_at']
  }

  read = async (limit: number, offset:number): Promise<PaginationResponseInterface> => {
    const response: any = await Users.findAndCountAll({
      limit,
      offset,
      attributes: this.column
    })

    const data: UsersOuput = response.rows

    const result: PaginationResponseInterface = {
      data,
      count: response.count
    }

    return result
  }

  // readByParam = async (payload: LoginInput): Promise<LoginOutput> => {
  //   const response: any = await Users.findOne({
  //     where: { username: payload.username },
  //     attributes: ['id', 'password']
  //   })

  //   return response
  // }

  // update = async (payload: LoginInput): Promise<LoginOutput> => {
  //   const response: any = await Users.findOne({
  //     where: { username: payload.username },
  //     attributes: ['id', 'password']
  //   })

  //   return response
  // }

  // delete = async (payload: LoginInput): Promise<LoginOutput> => {
  //   const response: any = await Users.findOne({
  //     where: { username: payload.username },
  //     attributes: ['id', 'password']
  //   })

  //   return response
  // }
}

export default UsersRepository
