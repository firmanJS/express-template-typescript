// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var users_pb = require('./users_pb.js');

function serialize_users_CreateUserRequest(arg) {
  if (!(arg instanceof users_pb.CreateUserRequest)) {
    throw new Error('Expected argument of type users.CreateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_CreateUserRequest(buffer_arg) {
  return users_pb.CreateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_DeletedResponse(arg) {
  if (!(arg instanceof users_pb.DeletedResponse)) {
    throw new Error('Expected argument of type users.DeletedResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_DeletedResponse(buffer_arg) {
  return users_pb.DeletedResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_User(arg) {
  if (!(arg instanceof users_pb.User)) {
    throw new Error('Expected argument of type users.User');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_User(buffer_arg) {
  return users_pb.User.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_UserRequest(arg) {
  if (!(arg instanceof users_pb.UserRequest)) {
    throw new Error('Expected argument of type users.UserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_UserRequest(buffer_arg) {
  return users_pb.UserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var UsersService = exports.UsersService = {
  createNewUser: {
    path: '/users.Users/CreateNewUser',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.CreateUserRequest,
    responseType: users_pb.User,
    requestSerialize: serialize_users_CreateUserRequest,
    requestDeserialize: deserialize_users_CreateUserRequest,
    responseSerialize: serialize_users_User,
    responseDeserialize: deserialize_users_User,
  },
  getUserByParam: {
    path: '/users.Users/GetUserByParam',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.UserRequest,
    responseType: users_pb.User,
    requestSerialize: serialize_users_UserRequest,
    requestDeserialize: deserialize_users_UserRequest,
    responseSerialize: serialize_users_User,
    responseDeserialize: deserialize_users_User,
  },
  deleteUserByParam: {
    path: '/users.Users/DeleteUserByParam',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.UserRequest,
    responseType: users_pb.DeletedResponse,
    requestSerialize: serialize_users_UserRequest,
    requestDeserialize: deserialize_users_UserRequest,
    responseSerialize: serialize_users_DeletedResponse,
    responseDeserialize: deserialize_users_DeletedResponse,
  },
};

exports.UsersClient = grpc.makeGenericClientConstructor(UsersService);
