import { UsersInput, UsersOuput } from '../db/models/Users'
import { RequestMetaInterface } from '../interface/request'
import { PaginationResponseInterface } from '../interface/response'
import { UsersUsecaseInterface } from '../interface/usecase'
import { UsersRepository } from '../repository/postgres'

class UsersUsecase implements UsersUsecaseInterface {
  repository: UsersRepository

  constructor() {
    this.repository = new UsersRepository()
  }

  create = async (payload: UsersInput): Promise<UsersOuput> => {
    const rows: UsersOuput = await this.repository.create(payload)

    const result: UsersOuput = rows

    return result
  }

  read = async (request: RequestMetaInterface): Promise<PaginationResponseInterface> => {
    const rows: PaginationResponseInterface = await this.repository.read(request)

    const result: PaginationResponseInterface = {
      data: rows.data,
      count: rows.count
    }

    return result
  }
}

export default UsersUsecase
