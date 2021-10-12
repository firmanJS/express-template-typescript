import { Op } from 'sequelize'
import { Users } from '../../db/models'
import { UsersInput, UsersOuput } from '../../db/models/Users'
import { PaginationResponseInterface } from '../../interface/response'
import UsersUsecaseInterface from '../../interface/usecase/users'
import { RequestMetaInterface } from '../../interface/request'

class UsersRepository implements UsersUsecaseInterface {
  public column: [string, string, string, string, string, string]

  constructor() {
    this.column = ['id', 'username', 'password', 'email', 'created_at', 'updated_at']
  }

  create = async (payload: UsersInput): Promise<UsersOuput> => {
    const rows: UsersOuput = await Users.create(payload)
    return rows
  }

  read = async (request: RequestMetaInterface): Promise<PaginationResponseInterface> => {
    const { limit, offset, search } = request
    const where: any = {}
    if (search) {
      where[Op.or] = {
        username: {
          [Op.iLike]: `%${search}%`,
        },
        email: {
          [Op.iLike]: `%${search}%`,
        }
      }
    }

    const response: any = await Users.findAndCountAll({
      limit, offset, where
      // attributes: this.column
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
