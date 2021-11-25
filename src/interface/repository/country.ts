/* eslint-disable no-unused-vars */
import { ResultBoolInterface, DataInterface } from '../response'
import { RequestMetaInterface } from '../request'
import { CountryAttributes, CountryWithMetaOuput } from '../../db/models/Country'
import { AttributesInterface } from '../../repository/postgres'

interface CountryRespositoryInterface {
  create(payload: CountryAttributes): Promise<CountryAttributes>
  read(requestDto: RequestMetaInterface): Promise<CountryWithMetaOuput>
  readByParam(params: CountryAttributes, attributes: AttributesInterface): Promise<DataInterface>
  update(params: CountryAttributes, payload: CountryAttributes): Promise<ResultBoolInterface>
  hardDelete(params: CountryAttributes): Promise<ResultBoolInterface>
}

export default CountryRespositoryInterface
