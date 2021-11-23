import mongoose from 'mongoose'
import {
  Countrys, CountryInput, CountryOuput
} from '../../db/models/Country'
import {
  ResultBoolInterface, PaginationResponseInterface,
  DataInterface
} from '../../interface/response'
import { CountryRespositoryInterface } from '../../interface/repository'
import { RequestMetaInterface } from '../../interface/request'

class CountryRepositoryMongo implements CountryRespositoryInterface {
  create = async (payload: CountryInput): Promise<CountryOuput> => {
    const rows = await Countrys.create(payload)
    return rows
  }

  read = async (request: RequestMetaInterface): Promise<PaginationResponseInterface> => {
    const { limit, offset } = request

    const rows = await Countrys.find()
      // .select()
      // .or(search)
      // .sort(paginations.sort)
      .limit(limit)
      .skip(offset)
      .lean(true)
      .hint({})

    const count = await Countrys.countDocuments()

    const result: PaginationResponseInterface = {
      rows,
      count
    }

    return result
  }

  readByParam = async (params: CountryOuput): Promise<DataInterface> => {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(params.id)
    const result = await Countrys.findOne({ _id })

    const response: DataInterface = { data: result! }

    return response
  }

  update = async (
    params: CountryOuput,
    payload:CountryInput
  ): Promise<ResultBoolInterface> => {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(params.id)
    const rows = await Countrys.updateOne(
      { _id }, { $set: payload }, { new: true }
    )

    const status: ResultBoolInterface = {
      status: !!rows?.modifiedCount
    }

    return status
  }

  hardDelete = async (params: CountryOuput): Promise<ResultBoolInterface> => {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(params.id)
    const rows = await Countrys.deleteOne({ _id })

    const status: ResultBoolInterface = {
      status: !!rows?.deletedCount // !! convert to boolean
    }

    return status
  }
}

export default CountryRepositoryMongo
