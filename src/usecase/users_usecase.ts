import { UsersInput, UsersOuput } from '../db/models/Users'
import { RequestMetaInterface, RequestParamsInterface } from '../interface/request'
import { ResultBoolInterface, PaginationResponseInterface } from '../interface/response'
import { UsersUsecaseInterface } from '../interface/usecase'
import { UsersRepository } from '../repository/postgres'

class UsersUsecase implements UsersUsecaseInterface {
  repository: UsersRepository

  constructor() {
    this.repository = new UsersRepository()
  }

  create = async (payload: UsersInput): Promise<UsersOuput> => {
    const result: UsersOuput = await this.repository.create(payload)
    return result
  }

  read = async (request: RequestMetaInterface): Promise<PaginationResponseInterface> => {
    const result: PaginationResponseInterface = await this.repository.read(request)
    return result
  }

  readByParam = async (params: RequestParamsInterface): Promise<UsersOuput> => {
    const result: UsersOuput = await this.repository.readByParam(params)
    return result
  }

  update = async (
    params: RequestParamsInterface,
    payload: UsersInput
  ): Promise<ResultBoolInterface> => {
    const result: ResultBoolInterface = await this.repository.update(params, payload)
    return result
  }

  hardDelete = async (params: RequestParamsInterface): Promise<ResultBoolInterface> => {
    const result: ResultBoolInterface = await this.repository.hardDelete(params)
    return result
  }
}

export default UsersUsecase
