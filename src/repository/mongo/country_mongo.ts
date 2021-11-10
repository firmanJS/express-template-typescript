import mongoose from 'mongoose'
import {
  Countrys, CountryInput, CountryOuput,
  CountryOuputMongoo,
} from '../../db/models/Country'
import {
  ResultBoolInterface, PaginationResponseInterface,
  DeletedResponseInterface,
  UpdatedResponseInterface
} from '../../interface/response'
import { CountryRespositoryInterface } from '../../interface/repository'
import { RequestMetaInterface } from '../../interface/request'

class CountryRepositoryMongo implements CountryRespositoryInterface {
  create = async (payload: CountryInput): Promise<CountryOuput> => {
    const rows: CountryOuput = await Countrys.create(payload)
    return rows
  }

  read = async (request: RequestMetaInterface): Promise<PaginationResponseInterface> => {
    const { limit, offset } = request

    const rows: CountryOuputMongoo[] = await Countrys.find()
      // .select()
      // .or(search)
      // .sort(paginations.sort)
      .limit(limit)
      .skip(offset)
      .lean(true)
      .hint({})

    const count: number = await Countrys.countDocuments()

    const result: PaginationResponseInterface = {
      rows,
      count
    }

    return result
  }

  readByParam = async (params: CountryOuput): Promise<CountryOuputMongoo> => {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(params.id)
    const response: any = await Countrys.findOne({ _id })
    return response
  }

  update = async (
    params: CountryOuput,
    payload:CountryInput
  ): Promise<ResultBoolInterface> => {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(params.id)
    const rows: UpdatedResponseInterface = await Countrys.updateOne(
      { _id }, { $set: payload }, { new: true }
    )

    const status: ResultBoolInterface = {
      status: !!rows?.modifiedCount
    }

    return status
  }

  hardDelete = async (params: CountryOuput): Promise<ResultBoolInterface> => {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(params.id)
    const rows: DeletedResponseInterface = await Countrys.deleteOne({ _id })

    const status: ResultBoolInterface = {
      status: !!rows?.deletedCount // !! convert to boolean
    }

    return status
  }
}

export default CountryRepositoryMongo
