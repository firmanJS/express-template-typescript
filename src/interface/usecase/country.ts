/* eslint-disable no-unused-vars */
import { ResultBoolInterface, PaginationResponseInterface } from '../response'
import { RequestMetaInterface, RequestParamsInterface } from '../request'
import { CountryInput, CountryOuput } from '../../db/models/Country'

interface CountryUsecaseInterface {
  create(payload: CountryInput): Promise<CountryOuput>
  read(requestDto: RequestMetaInterface): Promise<PaginationResponseInterface>
  readByParam(params: RequestParamsInterface): Promise<CountryOuput>
  update(params: RequestParamsInterface, payload: CountryInput): Promise<ResultBoolInterface>
  hardDelete(params: RequestParamsInterface): Promise<ResultBoolInterface>
}

export default CountryUsecaseInterface
