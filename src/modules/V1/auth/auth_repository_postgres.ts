import { Op } from 'sequelize'
import {
  Country, CountryAttributes, CountryWithMetaOuput,
  AttributesInterface
}
from '../../../db/models'
import { ResultBoolInterface, DataInterface } from '../../../interface/response'
import { CountryRespositoryInterface } from '../../../interface/repository'
import { RequestMetaInterface } from '../../../interface/request'

class CountryRepository implements CountryRespositoryInterface {
  create = async (payload: CountryAttributes): Promise<CountryAttributes> => {
    const rows = await Country.create(payload)
    return rows
  }

  read = async (request: RequestMetaInterface): Promise<CountryWithMetaOuput> => {
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

    const result = await Country.findAndCountAll({
      limit, offset, where
    })

    const response: CountryWithMetaOuput = {
      data: result.rows,
      count: result.count,
    }

    return response
  }

  readByParam = async (
    where: CountryAttributes,
    attr: AttributesInterface
  ): Promise<DataInterface> => {
    const result = await Country.findOne({
      where, raw: true, attributes: attr
    })

    const response: DataInterface = { data: result! }

    return response
  }

  update = async (
    where: CountryAttributes,
    payload:CountryAttributes
  ): Promise<ResultBoolInterface> => {
    const rows = await Country.update(
      payload, { where }
    )

    const status: ResultBoolInterface = {
      status: !!rows[0]
    }

    return status
  }

  hardDelete = async (where: CountryAttributes): Promise<ResultBoolInterface> => {
    const rows = await Country.destroy({
      where
    })

    const status: ResultBoolInterface = {
      status: !!rows
    }

    return status
  }
}

export default CountryRepository
