/* eslint-disable no-console */
import { Server, ServerCredentials } from 'grpc'
import { UsersService } from '../../proto/users_grpc_pb'
import { UsersServer } from './handler/user_grpc'
// import dbInit from './db'
const servers = new Server()
servers.addService(UsersService, new UsersServer())

const port = 80081
const uri = `localhost:${port}`
servers.bindAsync(uri,
  ServerCredentials.createInsecure(),
  (err: any) => {
    if (err) {
      console.error(err)
    }
    console.info(`GRPC Server Listening on ${uri}`)
  })

export default servers
