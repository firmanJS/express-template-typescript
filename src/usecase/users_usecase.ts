import { Request } from 'express'
import { UsersInput, UsersOuput } from '../db/models/Users'
import { Meta, RequestMetaInterface } from '../interface/request'
import { ResultBoolInterface, PaginationResponseInterface, DataInterface } from '../interface/response'
import { BaseUsecaseInterface } from '../interface/usecase'
import { UsersRepository } from '../repository/postgres'
import Custom from '../utils/custom'
import Authentication from '../utils/authentication'

class UsersUsecase implements BaseUsecaseInterface {
  repository: UsersRepository

  constructor() {
    this.repository = new UsersRepository()
  }

  create = async (req: Request): Promise<DataInterface> => {
    const payload: UsersInput = req?.body
    payload.password = await Authentication.passwordHash(payload.password!)
    payload.created_at = Custom.createdAt()
    payload.updated_at = Custom.updatedAt()

    const data: UsersOuput = await this.repository.create(payload)
    const result: DataInterface = { data }

    return result
  }

  read = async (req: Request): Promise<PaginationResponseInterface> => {
    const meta: RequestMetaInterface = Meta(req)
    const result: PaginationResponseInterface = await this.repository.read(meta)
    return result
  }

  readByParam = async (type: string, req: Request): Promise<DataInterface> => {
    let id: number
    let params: UsersOuput
    if (type === 'grpc') {

    } else {
      id = +req?.params?.id || 0
      params = { id }
    }
    const data: UsersOuput = await this.repository.readByParam(params)
    const result: DataInterface = { data }

    return result
  }

  update = async (req: Request): Promise<ResultBoolInterface> => {
    const id: number = +req?.params?.id || 0
    const params: UsersOuput = { id }
    const payload: UsersInput = req.body
    if (payload.password) {
      const hashedPassword: string = await Authentication.passwordHash(payload.password)
      payload.password = hashedPassword
    }
    payload.updated_at = Custom.updatedAt()
    const result: ResultBoolInterface = await this.repository.update(params, payload)
    return result
  }

  hardDelete = async (req: Request): Promise<ResultBoolInterface> => {
    const id: number = +req?.params?.id || 0
    const params: UsersOuput = { id }
    const result: ResultBoolInterface = await this.repository.hardDelete(params)
    return result
  }
}

export default UsersUsecase
