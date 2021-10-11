import { PaginationResponseInterface } from '../interface/response'
import { UsersUsecaseInterface } from '../interface/usecase'
import { UsersRepository } from '../repository/postgres'

class UsersUsecase implements UsersUsecaseInterface {
  repository: UsersRepository

  constructor() {
    this.repository = new UsersRepository()
  }

  read = async (limit: number, offset:number): Promise<PaginationResponseInterface> => {
    const rows: PaginationResponseInterface = await this.repository.read(limit, offset)

    const result: PaginationResponseInterface = {
      data: rows.data,
      count: rows.count
    }

    return result
  }
}

export default UsersUsecase
