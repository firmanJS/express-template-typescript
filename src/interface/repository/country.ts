/* eslint-disable no-unused-vars */
import { ResultBoolInterface, PaginationResponseInterface, DataInterface } from '../response'
import { RequestMetaInterface } from '../request'
import { CountryInput, CountryOuput, CountryOuputMongoo } from '../../db/models/Country'

interface CountryRespositoryInterface {
  create(payload: CountryInput): Promise<CountryOuput | CountryOuputMongoo>
  read(requestDto: RequestMetaInterface): Promise<PaginationResponseInterface>
  readByParam(params: CountryOuput): Promise<CountryOuput | DataInterface>
  update(params: CountryOuput, payload: CountryInput): Promise<ResultBoolInterface>
  hardDelete(params: CountryOuput): Promise<ResultBoolInterface>
}

export default CountryRespositoryInterface
