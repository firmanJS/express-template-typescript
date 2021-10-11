/* eslint-disable no-unused-vars */
import { PaginationResponseInterface } from '../response/'

interface UsersUsecaseInterface {
  // create(): Promise<RegisterOutput>
  read(limit: number, offset:number): Promise<PaginationResponseInterface>
  // readByParam(): Promise<UsersOuput>
  // update(): Promise<UsersOuput>
  // delete(): Promise<UsersOuput>
}

export default UsersUsecaseInterface
