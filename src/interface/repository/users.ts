/* eslint-disable no-unused-vars */
import { ResultBoolInterface, DataInterface } from '../response'
import { RequestMetaInterface } from '../request'
import {
  UsersInput, UsersWithMetaOuput, UsersOutput
} from '../../db/models/Users'

interface UsersRespositoryInterface {
  create(payload: UsersInput): Promise<UsersOutput>
  read(requestDto: RequestMetaInterface): Promise<UsersWithMetaOuput>
  readByParam(params: UsersOutput): Promise<DataInterface>
  update(params: UsersOutput, payload: UsersInput): Promise<ResultBoolInterface>
  hardDelete(params: UsersOutput): Promise<ResultBoolInterface>
}

export default UsersRespositoryInterface
