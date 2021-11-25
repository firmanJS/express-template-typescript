/* eslint-disable no-console */
import * as grpc from 'grpc'
import { UsersInput, DefaultAttributes, UsersAttributes } from '../../db/models/Users'
import { RequestMetaInterface } from '../../interface/request'
import { IUsersServer } from '../../proto/users_grpc_pb'
import {
  User, UserRequest, CreateOrUpdateUserRequest, DeletedResponse,
  UserPaginationRequest, UserListResponse
} from '../../proto/users_pb'
import { UsersRepository } from '../../repository/postgres'
import Authentication from '../../utils/authentication'
import Custom from '../../utils/custom'

export class UsersServer implements IUsersServer {
  private repository: UsersRepository = new UsersRepository()

  createNewUser = async (
    call: grpc.ServerUnaryCall<CreateOrUpdateUserRequest>,
    callback: grpc.sendUnaryData<User>
  ) => {
    const data = call.request.toObject()

    const params: UsersInput = {
      username: data.username,
      password: await Authentication.passwordHash(data.password!),
      email: data.email,
      created_at: Custom.createdAt(),
      updated_at: Custom.updatedAt()
    }

    try {
      const newUser = await this.repository.create(params)

      const user = new User()

      user.setId(newUser?.id!)
      user.setUsername(newUser?.username!)
      user.setPassword(newUser?.password!)
      user.setEmail(newUser?.email!)
      user.setCreatedAt(newUser?.created_at!)
      user.setUpdatedAt(newUser?.updated_at!)

      return callback(null, user)
    } catch (error: any) {
      error.code = grpc.status.INTERNAL
      return callback(error, null)
    }
  }

  getListUser = async (
    call: grpc.ServerUnaryCall<UserPaginationRequest>,
    callback: grpc.sendUnaryData<UserListResponse>
  ) => {
    try {
      const { search, page, limit } = call.request.toObject()
      const request: RequestMetaInterface = {
        search,
        page,
        limit,
        offset: page > 1 ? (limit * page) - limit : 0
      }

      const users = await this.repository.read(request)
      const usersList = new UserListResponse()
      const userData = new User()

      const data = users.data!.map((u: UsersAttributes) => {
        userData.setId(u.id!)
        userData.setUsername(u.username!)
        userData.setPassword(u.password!)
        userData.setEmail(u.email!)
        userData.setCreatedAt(u.created_at!)
        userData.setUpdatedAt(u.updated_at!)

        return userData
      })

      usersList.setUserList(data)
      usersList.setTotal(users.count!)
      usersList.setTotalPerPage(data.length)
      return callback(null, usersList)
    } catch (error: any) {
      error.code = grpc.status.INTERNAL
      return callback(error, null)
    }
  }

  getUserByParam = async (
    call: grpc.ServerUnaryCall<UserRequest>,
    callback: grpc.sendUnaryData<User>
  ) => {
    try {
      // const userId = call.request.getId()
      const { id } = call.request.toObject()
      let error: any
      const user = new User()

      if (!id) {
        error = new Error('id is required or invalid type data must be integer or number')
        error.code = grpc.status.INVALID_ARGUMENT
        return callback(error, null)
      }

      const params: UsersAttributes = { id }
      const users = await this.repository.readByParam(params, DefaultAttributes)
      const mapingData: UsersAttributes = users.data || { data: '' }

      if (!users) {
        error = new Error(`User not found with id ${id}`)
        error.code = grpc.status.NOT_FOUND
        return callback(error, null)
      }

      user.setId(mapingData.id!)
      user.setUsername(mapingData.username!)
      user.setEmail(mapingData.email!)
      user.setPassword(mapingData.password!)

      return callback(null, user)
    } catch (error: any) {
      error.code = grpc.status.INTERNAL
      return callback(error, null)
    }
  }

  updateUser = async (
    call: grpc.ServerUnaryCall<CreateOrUpdateUserRequest>,
    callback: grpc.sendUnaryData<User>
  ) => {
    const data = call.request.toObject()
    const params: UsersAttributes = { id: data?.id! }

    const payload: UsersInput = {
      username: data.username,
      password: await Authentication.passwordHash(data.password!),
      email: data.email,
      updated_at: Custom.updatedAt()
    }

    try {
      const newUser = await this.repository.update(params, payload)
      let error: any

      if (!newUser.status) {
        error = new Error(`User not found with id ${params.id}`)
        error.code = grpc.status.NOT_FOUND
        return callback(error, null)
      }

      const user = new User()

      user.setId(params?.id!)
      user.setUsername(payload?.username!)
      user.setPassword(payload?.password!)
      user.setEmail(payload?.email!)
      user.setUpdatedAt(payload?.updated_at!)

      return callback(null, user)
    } catch (error: any) {
      error.code = grpc.status.INTERNAL
      return callback(error, null)
    }
  }

  deleteUserByParam = async (
    call: grpc.ServerUnaryCall<UserRequest>,
    callback: grpc.sendUnaryData<DeletedResponse>
  ) => {
    try {
      const { id } = call.request.toObject();
      let error;

      if (!id) {
        error = new Error('id is required or invalid type data must be integer or number')
        // @ts-ignore
        error.code = grpc.status.INVALID_ARGUMENT;
        return callback(error, null);
      }

      const params: UsersAttributes = { id }
      const user = new DeletedResponse()

      const users = await this.repository.hardDelete(params)

      user.setStatus(users.status!)
      user.setMessage('delete data sucessfully')

      return callback(null, user);
    } catch (error: any) {
      error.code = grpc.status.INTERNAL
      return callback(error, null)
    }
  }
}
