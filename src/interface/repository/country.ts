/* eslint-disable no-unused-vars */
import { ResultBoolInterface, PaginationResponseInterface } from '../response'
import { RequestMetaInterface, RequestParamsInterface } from '../request'
import { CountryInput, CountryOuput, CountryOuputMongoo } from '../../db/models/Country'

interface CountryRespositoryInterface {
  create(payload: CountryInput): Promise<CountryOuput | CountryOuputMongoo>
  read(requestDto: RequestMetaInterface): Promise<PaginationResponseInterface>
  readByParam(params: RequestParamsInterface): Promise<CountryOuput | CountryOuputMongoo>
  update(params: RequestParamsInterface, payload: CountryInput): Promise<ResultBoolInterface>
  hardDelete(params: RequestParamsInterface): Promise<ResultBoolInterface>
}

export default CountryRespositoryInterface
