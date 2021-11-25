import { Op } from 'sequelize'
import Users, { UsersInput, UsersAttributes, UsersWithMetaOuput } from '../../db/models/Users'
import { ResultBoolInterface, DataInterface } from '../../interface/response'
import { UsersRepositoryInterface } from '../../interface/repository'
import { RequestMetaInterface } from '../../interface/request'
import { AttributesInterface } from '.'

class UsersRepository implements UsersRepositoryInterface {
  // public column: [string, string, string, string, string, string]

  // constructor() {
  //   this.column = ['id', 'username', 'password', 'email', 'created_at', 'updated_at']
  // }

  create = async (payload: UsersInput): Promise<UsersAttributes> => {
    const rows = await Users.create(payload)
    return rows
  }

  read = async (request: RequestMetaInterface): Promise<UsersWithMetaOuput> => {
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

    const result = await Users.findAndCountAll({
      limit, offset, where
    })

    const response: UsersWithMetaOuput = {
      data: result.rows,
      count: result.count,
    }

    return response
  }

  readByParam = async (
    where: UsersAttributes,
    attr: AttributesInterface
  ): Promise<DataInterface> => {
    const result = await Users.findOne({
      where, raw: true, attributes: attr
    })

    const response: DataInterface = { data: result! }

    return response
  }

  update = async (
    where: UsersAttributes,
    payload:UsersInput
  ): Promise<ResultBoolInterface> => {
    const rows = await Users.update(
      payload, { where }
    )

    const status: ResultBoolInterface = {
      status: !!rows[0]
    }

    return status
  }

  hardDelete = async (where: UsersAttributes): Promise<ResultBoolInterface> => {
    const rows = await Users.destroy({
      where
    })

    const status: ResultBoolInterface = {
      status: !!rows
    }

    return status
  }
}

export default UsersRepository
