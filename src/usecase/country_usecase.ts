import { v4 as uuidv4 } from 'uuid'
import { Request } from 'express'
import { CountryInput, CountryOuput } from '../db/models/Country'
import { RequestMetaInterface, RequestParamsInterface, Meta } from '../interface/request'
import { ResultBoolInterface, PaginationResponseInterface, DataInterface } from '../interface/response'
import { BaseUsecaseInterface } from '../interface/usecase'
import { CountryRepository } from '../repository/postgres'
import Custom from '../utils/custom'

class CountryUsecase implements BaseUsecaseInterface {
  repository: CountryRepository

  constructor() {
    this.repository = new CountryRepository()
  }

  create = async (req: Request): Promise<DataInterface> => {
    const payload: CountryInput = req?.body
    payload.id = uuidv4()
    payload.created_at = Custom.createdAt()
    payload.updated_at = Custom.updatedAt()

    const data: CountryOuput = await this.repository.create(payload)
    const result: DataInterface = { data }

    return result
  }

  read = async (req: Request): Promise<PaginationResponseInterface> => {
    const meta: RequestMetaInterface = Meta(req)
    const result: PaginationResponseInterface = await this.repository.read(meta)
    return result
  }

  readByParam = async (req: Request): Promise<DataInterface> => {
    const params: RequestParamsInterface = req?.params
    const data: CountryOuput = await this.repository.readByParam(params)
    const result: DataInterface = { data }

    return result
  }

  update = async (req: Request): Promise<ResultBoolInterface> => {
    const params: RequestParamsInterface = req?.params

    const payload: CountryInput = req.body
    payload.updated_at = Custom.updatedAt()

    const result: ResultBoolInterface = await this.repository.update(params, payload)
    return result
  }

  hardDelete = async (req: Request): Promise<ResultBoolInterface> => {
    const params: RequestParamsInterface = req?.params
    const result: ResultBoolInterface = await this.repository.hardDelete(params)
    return result
  }
}

export default CountryUsecase
