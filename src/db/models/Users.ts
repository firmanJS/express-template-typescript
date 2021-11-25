import mongoose from 'mongoose'

export interface UsersAttributes {
  _id?: mongoose.Types.ObjectId
  username?: string
  password?: string
  email?:string
  created_at?: string
  updated_at?: string
}

export interface UsersOutput {
  _id?: string
  username?: string
  password?: string
  email?:string
  created_at?: string
  updated_at?: string
}

export interface UsersInput {
  username?: string
  password?: string
  email?: string
  created_at?: string
  updated_at?: string
}
export interface UsersWithMetaOuput {
  data?: UsersAttributes[],
  count?: number,
}
export interface RegisterInput {
  username: string
  password: string
  created_at?: string
}

export interface RegisterOutput {
  username?: string
  email?: string
  created_at?: string
}

export interface LoginInput {
  username: string,
  password: string
}

export interface LoginOutput {
  id?: string
  password?: string
}

const UsersSchema: mongoose.Schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "can't be blank"],
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: [true, "can't be blank"],
    index: true
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid email type']
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Users: mongoose.Model<UsersAttributes> = mongoose.model('Users', UsersSchema)

export default Users
