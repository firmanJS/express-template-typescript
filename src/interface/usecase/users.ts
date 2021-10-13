/* eslint-disable no-unused-vars */
import { DeleteBoolInterface, PaginationResponseInterface } from '../response'
import { RequestMetaInterface, RequestParamsInterface } from '../request'
import { UsersInput, UsersOuput } from '../../db/models/Users'

interface UsersUsecaseInterface {
  create(payload: UsersInput): Promise<UsersOuput>
  read(requestDto: RequestMetaInterface): Promise<PaginationResponseInterface>
  // readByParam(): Promise<UsersOuput>
  // update(): Promise<UsersOuput>
  hardDelete(params: RequestParamsInterface): Promise<DeleteBoolInterface>
}

export default UsersUsecaseInterface
