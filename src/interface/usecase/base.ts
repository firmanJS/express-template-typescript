/* eslint-disable no-unused-vars */
import { Request } from 'express'
import { ResultBoolInterface, PaginationResponseInterface, DataInterface } from '../response'

interface BaseUsecaseInterface {
  create(req: Request): Promise<DataInterface>
  read(req: Request): Promise<PaginationResponseInterface>
  readByParam(req: Request): Promise<DataInterface>
  update(req: Request): Promise<ResultBoolInterface>
  hardDelete(req: Request): Promise<ResultBoolInterface>
}

export default BaseUsecaseInterface
