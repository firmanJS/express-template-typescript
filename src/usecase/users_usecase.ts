/* eslint-disable no-console */
import { Request } from 'express'
import { promisify } from 'util'
import { UsersInput, UsersOuput } from '../db/models/Users'
import { Meta, RequestMetaInterface, RequestParamsInterface } from '../interface/request'
import { ResultBoolInterface, PaginationResponseInterface, DataInterface } from '../interface/response'
import { BaseUsecaseInterface } from '../interface/usecase'
import { UsersRepository } from '../repository/postgres'
import Custom from '../utils/custom'
import Authentication from '../utils/authentication'
import { clientConfig, dynamicKey } from '../config/redis'

const getAsync = promisify(clientConfig.get).bind(clientConfig);
class UsersUsecase implements BaseUsecaseInterface {
  repository: UsersRepository

  constructor() {
    this.repository = new UsersRepository()
  }

  create = async (req: Request): Promise<DataInterface> => {
    const payload: UsersInput = req?.body
    payload.password = await Authentication.passwordHash(payload.password!)
    payload.created_at = Custom.createdAt()
    payload.updated_at = Custom.updatedAt()

    const data: UsersOuput = await this.repository.create(payload)
    const result: DataInterface = { data }

    return result
  }

  read = async (req: Request): Promise<PaginationResponseInterface> => {
    const meta: RequestMetaInterface = Meta(req)
    const key: string = dynamicKey(meta, 'users-list')

    if (clientConfig.connected) {
      const chechkCache = await getAsync(key) || ''

      if (chechkCache) {
        console.info(`redis source ${key}`)
        return JSON.parse(chechkCache)
      }
    }

    const result: PaginationResponseInterface = await this.repository.read(meta)
    clientConfig.setex(key, 1200, JSON.stringify(result)) // set redis key
    return result
  }

  readByParam = async (req: Request): Promise<DataInterface> => {
    const params: RequestParamsInterface = req?.params

    if (clientConfig.connected) {
      const chechkCache: string = await getAsync(`users${req?.params.id}`) || ''

      if (chechkCache) {
        console.info(`redis source users${req?.params.id}`)
        return JSON.parse(chechkCache)
      }
    }

    const data: UsersOuput = await this.repository.readByParam(params)
    const result: DataInterface = { data }
    clientConfig.setex(`users${req?.params.id}`, 1200, JSON.stringify(result)) // set redis key

    console.info(`api source ${`users${req?.params.id}`}`)
    return result
  }

  update = async (req: Request): Promise<ResultBoolInterface> => {
    const params: RequestParamsInterface = req?.params
    const payload: UsersInput = req.body
    if (payload.password) {
      const hashedPassword: string = await Authentication.passwordHash(payload.password)
      payload.password = hashedPassword
    }
    payload.updated_at = Custom.updatedAt()
    const result: ResultBoolInterface = await this.repository.update(params, payload)
    return result
  }

  hardDelete = async (req: Request): Promise<ResultBoolInterface> => {
    const params: RequestParamsInterface = req?.params
    const result: ResultBoolInterface = await this.repository.hardDelete(params)
    return result
  }
}

export default UsersUsecase
