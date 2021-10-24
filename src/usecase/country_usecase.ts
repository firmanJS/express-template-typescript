import { CountryInput, CountryOuput } from '../db/models/Country'
import { RequestMetaInterface, RequestParamsInterface } from '../interface/request'
import { ResultBoolInterface, PaginationResponseInterface } from '../interface/response'
import { CountryUsecaseInterface } from '../interface/usecase'
import { CountryRepository } from '../repository/postgres'

class CountryUsecase implements CountryUsecaseInterface {
  repository: CountryRepository

  constructor() {
    this.repository = new CountryRepository()
  }

  create = async (payload: CountryInput): Promise<CountryOuput> => {
    const result: CountryOuput = await this.repository.create(payload)
    return result
  }

  read = async (request: RequestMetaInterface): Promise<PaginationResponseInterface> => {
    const result: PaginationResponseInterface = await this.repository.read(request)
    return result
  }

  readByParam = async (params: RequestParamsInterface): Promise<CountryOuput> => {
    const result: CountryOuput = await this.repository.readByParam(params)
    return result
  }

  update = async (
    params: RequestParamsInterface,
    payload: CountryInput
  ): Promise<ResultBoolInterface> => {
    const result: ResultBoolInterface = await this.repository.update(params, payload)
    return result
  }

  hardDelete = async (params: RequestParamsInterface): Promise<ResultBoolInterface> => {
    const result: ResultBoolInterface = await this.repository.hardDelete(params)
    return result
  }
}

export default CountryUsecase
