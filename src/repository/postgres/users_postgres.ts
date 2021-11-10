import { Op } from 'sequelize'
import Users, { UsersInput, UsersOuput } from '../../db/models/Users'
import { ResultBoolInterface, PaginationResponseInterface } from '../../interface/response'
import { UsersRepositoryInterface } from '../../interface/repository'
import { RequestMetaInterface } from '../../interface/request'

class UsersRepository implements UsersRepositoryInterface {
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

    const result: PaginationResponseInterface = await Users.findAndCountAll({
      limit, offset, where
      // attributes: this.column
    })

    return result
  }

  readByParam = async (where: UsersOuput): Promise<UsersOuput> => {
    const response: any = await Users.findOne({
      where, plain: true
      // attributes: ['id', 'password']
    })

    return response
  }

  update = async (
    where: UsersOuput,
    payload:UsersInput
  ): Promise<ResultBoolInterface> => {
    const rows: [number, UsersOuput[]] = await Users.update(
      payload, { where }
    )

    const status: ResultBoolInterface = {
      status: !!rows[0]
    }

    return status
  }

  hardDelete = async (where: UsersOuput): Promise<ResultBoolInterface> => {
    const rows: number = await Users.destroy({
      where
    })

    const status: ResultBoolInterface = {
      status: !!rows
    }

    return status
  }
}

export default UsersRepository
