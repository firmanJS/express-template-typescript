import { Op } from 'sequelize'
import { Country, CountryInput, CountryOuput } from '../../db/models/Country'
import { ResultBoolInterface, PaginationResponseInterface } from '../../interface/response'
import { CountryRespositoryInterface } from '../../interface/repository'
import { RequestMetaInterface } from '../../interface/request'

class CountryRepository implements CountryRespositoryInterface {
  create = async (payload: CountryInput): Promise<CountryOuput> => {
    const rows: CountryOuput = await Country.create(payload)
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

    const result: PaginationResponseInterface = await Country.findAndCountAll({
      limit, offset, where
    })

    return result
  }

  readByParam = async (where: CountryOuput): Promise<CountryOuput> => {
    const response: any = await Country.findOne({ where })

    return response
  }

  update = async (
    where: CountryOuput,
    payload:CountryInput
  ): Promise<ResultBoolInterface> => {
    const rows: [number, CountryOuput[]] = await Country.update(
      payload, { where }
    )

    const status: ResultBoolInterface = {
      status: !!rows[0]
    }

    return status
  }

  hardDelete = async (where: CountryOuput): Promise<ResultBoolInterface> => {
    const rows: number = await Country.destroy({ where })

    const status: ResultBoolInterface = {
      status: !!rows
    }

    return status
  }
}

export default CountryRepository
