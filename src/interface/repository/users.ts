/* eslint-disable no-unused-vars */
import { ResultBoolInterface, PaginationResponseInterface, DataInterface } from '../response'
import { RequestMetaInterface } from '../request'
import { UsersInput, UsersOuput } from '../../db/models/Users'

interface UsersRepositoryInterface {
  create(payload: UsersInput): Promise<UsersOuput>
  read(requestDto: RequestMetaInterface): Promise<PaginationResponseInterface>
  readByParam(params: UsersOuput): Promise<DataInterface>
  update(params: UsersInput, payload: UsersInput): Promise<ResultBoolInterface>
  hardDelete(params: UsersInput): Promise<ResultBoolInterface>
}

export default UsersRepositoryInterface
