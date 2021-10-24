import { Op } from 'sequelize'
import { Country } from '../../db/models'
import { CountryInput, CountryOuput } from '../../db/models/Country'
import { ResultBoolInterface, PaginationResponseInterface } from '../../interface/response'
import { CountryUsecaseInterface } from '../../interface/usecase'
import { RequestMetaInterface, RequestParamsInterface } from '../../interface/request'

class CountryRepository implements CountryUsecaseInterface {
  create = async (payload: CountryInput): Promise<CountryOuput> => {
    const rows: CountryOuput = await Country.create(payload)
    return rows
  }

  read = async (request: RequestMetaInterface): Promise<PaginationResponseInterface> => {
    const { limit, offset, search } = request
    const where: any = {}
    if (search) {
      where[Op.or] = {
        name: {
          [Op.iLike]: `%${search}%`,
        },
        code: {
          [Op.iLike]: `%${search}%`,
        }
      }
    }

    const result: PaginationResponseInterface = await Country.findAndCountAll({
      limit, offset, where
    })

    return result
  }

  readByParam = async (params: RequestParamsInterface): Promise<CountryOuput> => {
    const response: any = await Country.findOne({
      where: { id: params.id! },
    })

    return response
  }

  update = async (
    params: RequestParamsInterface,
    payload:CountryInput
  ): Promise<ResultBoolInterface> => {
    const rows: any = await Country.update(
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
    const rows: any = await Country.destroy({
      where: { id: params.id! }
    })

    const status: ResultBoolInterface = {
      status: rows
    }

    return status
  }
}

export default CountryRepository
