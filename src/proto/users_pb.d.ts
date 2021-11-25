// package: users
// file: users.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class User extends jspb.Message { 
    getId(): string;
    setId(value: string): User;
    getUsername(): string;
    setUsername(value: string): User;
    getPassword(): string;
    setPassword(value: string): User;
    getEmail(): string;
    setEmail(value: string): User;
    getCreatedAt(): string;
    setCreatedAt(value: string): User;
    getUpdatedAt(): string;
    setUpdatedAt(value: string): User;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): User.AsObject;
    static toObject(includeInstance: boolean, msg: User): User.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): User;
    static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
    export type AsObject = {
        id: string,
        username: string,
        password: string,
        email: string,
        createdAt: string,
        updatedAt: string,
    }
}

export class UserListResponse extends jspb.Message { 
    clearUserList(): void;
    getUserList(): Array<User>;
    setUserList(value: Array<User>): UserListResponse;
    addUser(value?: User, index?: number): User;
    getTotal(): number;
    setTotal(value: number): UserListResponse;
    getTotalPerPage(): number;
    setTotalPerPage(value: number): UserListResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserListResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UserListResponse): UserListResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserListResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserListResponse;
    static deserializeBinaryFromReader(message: UserListResponse, reader: jspb.BinaryReader): UserListResponse;
}

export namespace UserListResponse {
    export type AsObject = {
        userList: Array<User.AsObject>,
        total: number,
        totalPerPage: number,
    }
}

export class DeletedResponse extends jspb.Message { 
    getStatus(): boolean;
    setStatus(value: boolean): DeletedResponse;
    getMessage(): string;
    setMessage(value: string): DeletedResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeletedResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeletedResponse): DeletedResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeletedResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeletedResponse;
    static deserializeBinaryFromReader(message: DeletedResponse, reader: jspb.BinaryReader): DeletedResponse;
}

export namespace DeletedResponse {
    export type AsObject = {
        status: boolean,
        message: string,
    }
}

export class UserRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): UserRequest;
    getUsername(): string;
    setUsername(value: string): UserRequest;
    getPassword(): string;
    setPassword(value: string): UserRequest;
    getEmail(): string;
    setEmail(value: string): UserRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UserRequest): UserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserRequest;
    static deserializeBinaryFromReader(message: UserRequest, reader: jspb.BinaryReader): UserRequest;
}

export namespace UserRequest {
    export type AsObject = {
        id: string,
        username: string,
        password: string,
        email: string,
    }
}

export class UserPaginationRequest extends jspb.Message { 
    getSearch(): string;
    setSearch(value: string): UserPaginationRequest;
    getPage(): number;
    setPage(value: number): UserPaginationRequest;
    getLimit(): number;
    setLimit(value: number): UserPaginationRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserPaginationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UserPaginationRequest): UserPaginationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserPaginationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserPaginationRequest;
    static deserializeBinaryFromReader(message: UserPaginationRequest, reader: jspb.BinaryReader): UserPaginationRequest;
}

export namespace UserPaginationRequest {
    export type AsObject = {
        search: string,
        page: number,
        limit: number,
    }
}

export class CreateOrUpdateUserRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): CreateOrUpdateUserRequest;
    getUsername(): string;
    setUsername(value: string): CreateOrUpdateUserRequest;
    getPassword(): string;
    setPassword(value: string): CreateOrUpdateUserRequest;
    getEmail(): string;
    setEmail(value: string): CreateOrUpdateUserRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateOrUpdateUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateOrUpdateUserRequest): CreateOrUpdateUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateOrUpdateUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateOrUpdateUserRequest;
    static deserializeBinaryFromReader(message: CreateOrUpdateUserRequest, reader: jspb.BinaryReader): CreateOrUpdateUserRequest;
}

export namespace CreateOrUpdateUserRequest {
    export type AsObject = {
        id: string,
        username: string,
        password: string,
        email: string,
    }
}
