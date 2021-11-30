/* eslint-disable no-unused-vars */
import { ResultBoolInterface, DataInterface } from '../response'
import { RequestMetaInterface } from '../request'
import { UsersInput, UsersAttributes, UsersWithMetaOuput } from '../../db/models/Users'
import { AttributesInterface } from '../../repository/postgres'

interface UsersRepositoryInterface {
  create(payload: UsersInput): Promise<UsersAttributes>
  read(requestDto: RequestMetaInterface): Promise<UsersWithMetaOuput>
  readByParam(params: UsersAttributes, attributes: AttributesInterface): Promise<DataInterface>
  update(params: UsersInput, payload: UsersInput): Promise<ResultBoolInterface>
  hardDelete(params: UsersInput): Promise<ResultBoolInterface>
}

export default UsersRepositoryInterface
