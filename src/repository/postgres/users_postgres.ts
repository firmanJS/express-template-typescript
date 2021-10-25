import { Op } from 'sequelize'
import Users, { UsersInput, UsersOuput } from '../../db/models/Users'
import { ResultBoolInterface, PaginationResponseInterface } from '../../interface/response'
import { UsersRepositoryInterface } from '../../interface/repository'
import { RequestMetaInterface, RequestParamsInterface } from '../../interface/request'

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

  readByParam = async (params: RequestParamsInterface): Promise<UsersOuput> => {
    const response: any = await Users.findOne({
      where: { id: params.id! },
      // attributes: ['id', 'password']
    })

    return response
  }

  update = async (
    params: RequestParamsInterface,
    payload:UsersInput
  ): Promise<ResultBoolInterface> => {
    const rows: any = await Users.update(
      payload, {
        where: { id: params.id! }
      }
    )

    const status: ResultBoolInterface = {
      status: rows[0]
    }

    return status
  }

  hardDelete = async (params: RequestParamsInterface): Promise<ResultBoolInterface> => {
    const rows: any = await Users.destroy({
      where: { id: params.id! }
    })

    const status: ResultBoolInterface = {
      status: rows
    }

    return status
  }
}

export default UsersRepository
