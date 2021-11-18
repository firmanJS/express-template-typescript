/* eslint-disable no-console */
import * as grpc from 'grpc'
import { UsersInput, UsersOuput } from '../../db/models/Users'
import { IUsersServer } from '../../proto/users_grpc_pb'
import {
  User, UserRequest, CreateUserRequest, DeletedResponse
} from '../../proto/users_pb'
import { UsersRepository } from '../../repository/postgres'
import Custom from '../../utils/custom'

export class UsersServer implements IUsersServer {
  private repository: UsersRepository = new UsersRepository()

  createNewUser = async (
    call: grpc.ServerUnaryCall<CreateUserRequest>,
    callback: grpc.sendUnaryData<User>
  ) => {
    const data = call.request.toObject()

    const params: UsersInput = {
      username: data.username,
      password: data.password,
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

      const params: UsersOuput = { id }
      const users = await this.repository.readByParam(params)
      const mapingData: UsersOuput = users.data || { data: '' }

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

      const params: UsersOuput = { id }
      const user = new DeletedResponse()

      const users = await this.repository.hardDelete(params)

      user.setStatus(users.status!)

      return callback(null, user);
    } catch (error: any) {
      error.code = grpc.status.INTERNAL
      return callback(error, null)
    }
  }
}
