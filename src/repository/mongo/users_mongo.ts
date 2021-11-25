import mongoose from 'mongoose'
import Users, {
  UsersInput, UsersOutput, UsersWithMetaOuput
} from '../../db/models/Users'
import {
  ResultBoolInterface,
  DataInterface
} from '../../interface/response'
import { UsersRepositoryInterface } from '../../interface/repository'
import { RequestMetaInterface } from '../../interface/request'

class UsersRepositoryMongo implements UsersRepositoryInterface {
  create = async (payload: UsersInput): Promise<UsersOutput> => {
    const rows = await Users.create(payload)
    return rows
  }

  read = async (request: RequestMetaInterface): Promise<UsersWithMetaOuput> => {
    const { limit, offset } = request

    const data = await Users.find()
      // .select()
      // .or(search)
      // .sort(paginations.sort)
      .limit(limit)
      .skip(offset)
      .lean(true)
      .hint({})

    const count = await Users.countDocuments()

    const response: UsersWithMetaOuput = {
      data,
      count
    }

    return response
  }

  readByParam = async (params: UsersOutput): Promise<DataInterface> => {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(params._id)
    const result = await Users.findOne({ _id })

    const response: DataInterface = { data: result! }

    return response
  }

  update = async (
    params: UsersOutput,
    payload:UsersInput
  ): Promise<ResultBoolInterface> => {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(params._id)
    const rows = await Users.updateOne(
      { _id }, { $set: payload }, { new: true }
    )

    const status: ResultBoolInterface = {
      status: !!rows?.modifiedCount
    }

    return status
  }

  hardDelete = async (params: UsersOutput): Promise<ResultBoolInterface> => {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(params._id)
    const rows = await Users.deleteOne({ _id })

    const status: ResultBoolInterface = {
      status: !!rows?.deletedCount // !! convert to boolean
    }

    return status
  }
}

export default UsersRepositoryMongo
