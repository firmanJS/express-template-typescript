import { v4 as uuidv4 } from 'uuid'
import { Request } from 'express'
import { CountryInput, CountryOuput, CountryOuputMongoo } from '../db/models/Country'
import { RequestMetaInterface, Meta } from '../interface/request'
import { ResultBoolInterface, PaginationResponseInterface, DataInterface } from '../interface/response'
import { BaseUsecaseInterface } from '../interface/usecase'
import { CountryRepositoryMongo } from '../repository/mongo'
import Custom from '../utils/custom'

class CountryUsecase implements BaseUsecaseInterface {
  // repository: CountryRepository

  repositoryMongo: CountryRepositoryMongo

  constructor() {
    // this.repository = new CountryRepository()
    this.repositoryMongo = new CountryRepositoryMongo()
  }

  create = async (req: Request): Promise<DataInterface> => {
    const payload: CountryInput = req?.body
    payload.id = uuidv4()
    payload.created_at = Custom.createdAt()
    payload.updated_at = Custom.updatedAt()

    const data: CountryOuput = await this.repositoryMongo.create(payload)
    const result: DataInterface = { data }

    return result
  }

  read = async (req: Request): Promise<PaginationResponseInterface> => {
    const meta: RequestMetaInterface = Meta(req)
    const result: PaginationResponseInterface = await this.repositoryMongo.read(meta)
    return result
  }

  readByParam = async (req: Request): Promise<DataInterface> => {
    const params: CountryOuput = req?.params
    const data: CountryOuputMongoo = await this.repositoryMongo.readByParam(params)
    const result: DataInterface = { data }

    return result
  }

  update = async (req: Request): Promise<ResultBoolInterface> => {
    const params: CountryOuput = req?.params

    const payload: CountryInput = req.body
    payload.updated_at = Custom.updatedAt()

    const result: ResultBoolInterface = await this.repositoryMongo.update(params, payload)
    return result
  }

  hardDelete = async (req: Request): Promise<ResultBoolInterface> => {
    const params: CountryOuput = req?.params
    const result: ResultBoolInterface = await this.repositoryMongo.hardDelete(params)
    return result
  }
}

export default CountryUsecase
