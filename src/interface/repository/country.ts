/* eslint-disable no-unused-vars */
import { ResultBoolInterface, PaginationResponseInterface, DataInterface } from '../response'
import { RequestMetaInterface } from '../request'
import { CountryInput, CountryOuput } from '../../db/models/Country'

interface CountryRespositoryInterface {
  create(payload: CountryInput): Promise<CountryOuput>
  read(requestDto: RequestMetaInterface): Promise<PaginationResponseInterface>
  readByParam(params: CountryOuput): Promise<DataInterface>
  update(params: CountryOuput, payload: CountryInput): Promise<ResultBoolInterface>
  hardDelete(params: CountryOuput): Promise<ResultBoolInterface>
}

export default CountryRespositoryInterface
