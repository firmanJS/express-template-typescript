// package: users
// file: users.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as users_pb from "./users_pb";

interface IUsersService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createNewUser: IUsersService_ICreateNewUser;
    getListUser: IUsersService_IGetListUser;
    getUserByParam: IUsersService_IGetUserByParam;
    updateUser: IUsersService_IUpdateUser;
    deleteUserByParam: IUsersService_IDeleteUserByParam;
}

interface IUsersService_ICreateNewUser extends grpc.MethodDefinition<users_pb.CreateOrUpdateUserRequest, users_pb.User> {
    path: "/users.Users/CreateNewUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.CreateOrUpdateUserRequest>;
    requestDeserialize: grpc.deserialize<users_pb.CreateOrUpdateUserRequest>;
    responseSerialize: grpc.serialize<users_pb.User>;
    responseDeserialize: grpc.deserialize<users_pb.User>;
}
interface IUsersService_IGetListUser extends grpc.MethodDefinition<users_pb.UserPaginationRequest, users_pb.UserListResponse> {
    path: "/users.Users/GetListUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.UserPaginationRequest>;
    requestDeserialize: grpc.deserialize<users_pb.UserPaginationRequest>;
    responseSerialize: grpc.serialize<users_pb.UserListResponse>;
    responseDeserialize: grpc.deserialize<users_pb.UserListResponse>;
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
interface IUsersService_IUpdateUser extends grpc.MethodDefinition<users_pb.CreateOrUpdateUserRequest, users_pb.User> {
    path: "/users.Users/UpdateUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.CreateOrUpdateUserRequest>;
    requestDeserialize: grpc.deserialize<users_pb.CreateOrUpdateUserRequest>;
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
    createNewUser: grpc.handleUnaryCall<users_pb.CreateOrUpdateUserRequest, users_pb.User>;
    getListUser: grpc.handleUnaryCall<users_pb.UserPaginationRequest, users_pb.UserListResponse>;
    getUserByParam: grpc.handleUnaryCall<users_pb.UserRequest, users_pb.User>;
    updateUser: grpc.handleUnaryCall<users_pb.CreateOrUpdateUserRequest, users_pb.User>;
    deleteUserByParam: grpc.handleUnaryCall<users_pb.UserRequest, users_pb.DeletedResponse>;
}

export interface IUsersClient {
    createNewUser(request: users_pb.CreateOrUpdateUserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    createNewUser(request: users_pb.CreateOrUpdateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    createNewUser(request: users_pb.CreateOrUpdateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    getListUser(request: users_pb.UserPaginationRequest, callback: (error: grpc.ServiceError | null, response: users_pb.UserListResponse) => void): grpc.ClientUnaryCall;
    getListUser(request: users_pb.UserPaginationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.UserListResponse) => void): grpc.ClientUnaryCall;
    getListUser(request: users_pb.UserPaginationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.UserListResponse) => void): grpc.ClientUnaryCall;
    getUserByParam(request: users_pb.UserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    getUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    getUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    updateUser(request: users_pb.CreateOrUpdateUserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    updateUser(request: users_pb.CreateOrUpdateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    updateUser(request: users_pb.CreateOrUpdateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    deleteUserByParam(request: users_pb.UserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.DeletedResponse) => void): grpc.ClientUnaryCall;
    deleteUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.DeletedResponse) => void): grpc.ClientUnaryCall;
    deleteUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.DeletedResponse) => void): grpc.ClientUnaryCall;
}

export class UsersClient extends grpc.Client implements IUsersClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createNewUser(request: users_pb.CreateOrUpdateUserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public createNewUser(request: users_pb.CreateOrUpdateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public createNewUser(request: users_pb.CreateOrUpdateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public getListUser(request: users_pb.UserPaginationRequest, callback: (error: grpc.ServiceError | null, response: users_pb.UserListResponse) => void): grpc.ClientUnaryCall;
    public getListUser(request: users_pb.UserPaginationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.UserListResponse) => void): grpc.ClientUnaryCall;
    public getListUser(request: users_pb.UserPaginationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.UserListResponse) => void): grpc.ClientUnaryCall;
    public getUserByParam(request: users_pb.UserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public getUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public getUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public updateUser(request: users_pb.CreateOrUpdateUserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public updateUser(request: users_pb.CreateOrUpdateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public updateUser(request: users_pb.CreateOrUpdateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.User) => void): grpc.ClientUnaryCall;
    public deleteUserByParam(request: users_pb.UserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.DeletedResponse) => void): grpc.ClientUnaryCall;
    public deleteUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.DeletedResponse) => void): grpc.ClientUnaryCall;
    public deleteUserByParam(request: users_pb.UserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.DeletedResponse) => void): grpc.ClientUnaryCall;
}
