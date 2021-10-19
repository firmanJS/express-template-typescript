/* eslint-disable no-unused-vars */
import { ResultBoolInterface, PaginationResponseInterface } from '../response'
import { RequestMetaInterface, RequestParamsInterface } from '../request'
import { UsersInput, UsersOuput } from '../../db/models/Users'

interface UsersUsecaseInterface {
  create(payload: UsersInput): Promise<UsersOuput>
  read(requestDto: RequestMetaInterface): Promise<PaginationResponseInterface>
  readByParam(params: RequestParamsInterface): Promise<UsersOuput>
  update(params: RequestParamsInterface, payload: UsersInput): Promise<ResultBoolInterface>
  hardDelete(params: RequestParamsInterface): Promise<ResultBoolInterface>
}

export default UsersUsecaseInterface
