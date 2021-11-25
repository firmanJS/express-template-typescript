import mongoose from 'mongoose'
import Country, { CountryInput, CountryWithMetaOuput, CountryOuput } from '../../db/models/Country'
import {
  ResultBoolInterface,
  DataInterface
} from '../../interface/response'
import { CountryRespositoryInterface } from '../../interface/repository'
import { RequestMetaInterface } from '../../interface/request'

class CountryRepositoryMongo implements CountryRespositoryInterface {
  create = async (payload: CountryInput): Promise<CountryOuput> => {
    const rows = await Country.create(payload)
    return rows
  }

  read = async (request: RequestMetaInterface): Promise<CountryWithMetaOuput> => {
    const { limit, offset } = request

    const data = await Country.find()
      // .select()
      // .or(search)
      // .sort(paginations.sort)
      .limit(limit)
      .skip(offset)
      .lean(true)
      .hint({})

    const count = await Country.countDocuments()

    const response: CountryWithMetaOuput = {
      data,
      count
    }

    return response
  }

  readByParam = async (params: CountryOuput): Promise<DataInterface> => {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(params._id)
    const result = await Country.findOne({ _id })

    const response: DataInterface = { data: result! }

    return response
  }

  update = async (
    params: CountryOuput,
    payload:CountryInput
  ): Promise<ResultBoolInterface> => {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(params._id)
    const rows = await Country.updateOne(
      { _id }, { $set: payload }, { new: true }
    )

    const status: ResultBoolInterface = {
      status: !!rows?.modifiedCount
    }

    return status
  }

  hardDelete = async (params: CountryOuput): Promise<ResultBoolInterface> => {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(params._id)
    const rows = await Country.deleteOne({ _id })

    const status: ResultBoolInterface = {
      status: !!rows?.deletedCount // !! convert to boolean
    }

    return status
  }
}

export default CountryRepositoryMongo
