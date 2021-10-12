/* eslint-disable no-unused-vars */
import { PaginationResponseInterface } from '../response'
import { RequestMetaInterface } from '../request'
import { UsersInput, UsersOuput } from '../../db/models/Users'

interface UsersUsecaseInterface {
  create(payload: UsersInput): Promise<UsersOuput>
  read(requestDto: RequestMetaInterface): Promise<PaginationResponseInterface>
  // readByParam(): Promise<UsersOuput>
  // update(): Promise<UsersOuput>
  // delete(): Promise<UsersOuput>
}

export default UsersUsecaseInterface
