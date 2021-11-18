/* eslint-disable no-console */
import * as grpc from 'grpc'
import { UsersOuput } from '../../../db/models/Users'
import { IUsersServer } from '../../../proto/users_grpc_pb'
import { User, UserRequest } from '../../../proto/users_pb'
import { UsersUsecase } from '../../../usecase'

export class UsersServer implements IUsersServer {
  private usecase:UsersUsecase = new UsersUsecase();

  async getUserByParam(
    call: grpc.ServerUnaryCall<UserRequest>,
    callback: grpc.sendUnaryData<User>
  ) {
    try {
      // const userId = call.request.getId()
      const { id } = call.request.toObject();
      let error: any;
      const user = new User()

      if (!id) {
        error = new Error('id is required');
        error.code = grpc.status.INVALID_ARGUMENT;
        return callback(error, null);
      }

      const params: UsersOuput = { id }
      const users = await this.usecase.readByParam(params)
      const mapingData: UsersOuput = users.data || { data: '' }

      if (!users) {
        error = new Error(`User not found with id ${id}`);
        error.code = grpc.status.NOT_FOUND;
        return callback(error, null);
      }

      user.setId(mapingData.id!)
      user.setUsername(mapingData.username!)
      user.setEmail(mapingData.email!)
      user.setPassword(mapingData.password!)

      return callback(null, user)
    } catch (error:any) {
      error.code = grpc.status.INTERNAL;
      return callback(error, null);
    }
  }
}
