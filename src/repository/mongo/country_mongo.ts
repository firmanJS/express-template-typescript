import { Op } from 'sequelize'
import { Countrys, CountryInput, CountryOuput } from '../../db/models/Country'
import { ResultBoolInterface, PaginationResponseInterface } from '../../interface/response'
import { CountryRespositoryInterface } from '../../interface/repository'
import { RequestMetaInterface, RequestParamsInterface } from '../../interface/request'

class CountryRepositoryMongo implements CountryRespositoryInterface {
  create = async (payload: CountryInput): Promise<CountryOuput> => {
    const rows: CountryOuput = await Countrys.create(payload)
    return rows
  }

  read = async (request: RequestMetaInterface): Promise<PaginationResponseInterface> => {
    const { limit, offset, search } = request
    const where: any = {}
    if (search) {
      where[Op.or] = {
        name: { [Op.iLike]: `%${search}%` },
        code: { [Op.iLike]: `%${search}%` }
      }
    }

    const result: any = await Countrys.find({
      limit, offset, where
    })

    return result
  }

  readByParam = async (params: RequestParamsInterface): Promise<CountryOuput> => {
    const response: any = await Countrys.findOne({
      where: { id: params.id! },
    })

    return response
  }

  update = async (
    params: RequestParamsInterface,
    payload:CountryInput
  ): Promise<ResultBoolInterface> => {
    const rows: any = await Countrys.update(
      payload, {
        where: { id: params.id! }
      }
    )

    const status: ResultBoolInterface = {
      status: rows[0]
    }

    return status
  }

  hardDelete = async (params: RequestParamsInterface): Promise<ResultBoolInterface> => {
    const rows: any = await Countrys.deleteOne({
      where: { id: params.id! }
    })

    const status: ResultBoolInterface = {
      status: rows
    }

    return status
  }
}

export default CountryRepositoryMongo
