// package: users
// file: users.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as users_pb from "./users_pb";

interface IUsersService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createNewUser: IUsersService_ICreateNewUser;
    getUserByParam: IUsersService_IGetUserByParam;
    deleteUserByParam: IUsersService_IDeleteUserByParam;
}

interface IUsersService_ICreateNewUser extends grpc.MethodDefinition<users_pb.CreateUserRequest, users_pb.User> {
    path: "/users.Users/CreateNewUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.CreateUserRequest>;
    requestDeserialize: grpc.deserialize<users_pb.CreateUserRequest>;
    responseSerialize: grpc.serialize<users_pb.User>;
    responseDeserialize: grpc.deserialize<users_pb.User>;
}
interface IUsersService_IGetUserByParam extends grpc.MethodDefinition<users_pb.UserRequest, users_pb.User> {
    path: "/users.Users/GetUserByParam";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.UserRequest>;
    requestDeserialize: grpc.deserialize<users_pb.UserRequest>;
    responseSerialize: grpc.serialize<users_pb.User>;
    responseDeserialize: grpc.deserialize<users_pb.User>;
}
interface IUsersService_IDeleteUserByParam extends grpc.MethodDefinition<users_pb.UserRequest, users_pb.DeletedResponse> {
    path: "/users.Users/DeleteUserByParam";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.UserRequest>;
    requestDeserialize: grpc.deserialize<users_pb.UserRequest>;
    responseSerialize: grpc.serialize<users_pb.DeletedResponse>;
    responseDeserialize: grpc.deserialize<users_pb.DeletedResponse>;
}

export const UsersService: IUsersService;

export interface IUsersServer {
    createNewUser: grpc.handleUnaryCall<users_pb.CreateUserRequest, users_pb.User>;
    getUserByParam: grpc.handleUnaryCall<users_pb.UserRequest, users_pb.User>;
    deleteUserByParam: grpc.handleUnaryCall<users_pb.UserRequest, users_pb.DeletedResponse>;
}

export interface IUsersClient {
    createNewUser(request: users_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    createNewUser(request: users_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    createNewUser(request: users_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    getUserByParam(request: users_pb.UserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    getUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    getUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    deleteUserByParam(request: users_pb.UserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.DeletedResponse) => void): grpc.ClientUnaryCall;
    deleteUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.DeletedResponse) => void): grpc.ClientUnaryCall;
    deleteUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.DeletedResponse) => void): grpc.ClientUnaryCall;
}

export class UsersClient extends grpc.Client implements IUsersClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createNewUser(request: users_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public createNewUser(request: users_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public createNewUser(request: users_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public getUserByParam(request: users_pb.UserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public getUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public getUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public deleteUserByParam(request: users_pb.UserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.DeletedResponse) => void): grpc.ClientUnaryCall;
    public deleteUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.DeletedResponse) => void): grpc.ClientUnaryCall;
    public deleteUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.DeletedResponse) => void): grpc.ClientUnaryCall;
}
