import {
  DataTypes, Model
} from 'sequelize'
import dbConnection from '../../config/database'

interface UsersAttributes {
  id: number
  username?: string
  password?: string
  email?: string
  created_at?: Date
  updated_at?: Date
}

export interface UsersInput {
  username?: string
  password?: string
  email?: string
  created_at?: string
  updated_at?: string
}

export interface UsersOuput extends UsersAttributes {}

export interface RegisterInput {
  username: string
  password: string
  created_at?: string
}

export interface RegisterOutput {
  username?: string
  email?: string
  created_at?: Date
}

export interface LoginInput {
  username: string
}

export interface LoginOutput {
  id?: number
  password?: string
}

// export interface UsersOuput extends Required<UsersAttributes> { }
// export interface UsersOuput extends Pick<UsersAttributes, 'username'> {}

class Users extends Model<UsersAttributes> implements UsersAttributes {
  public id!: number

  public username!: string

  public password!: string

  public email!: string

  // timestamps!
  public readonly created_at!: Date

  public readonly updated_at!: Date
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'username',
      msg: 'username already in use!'
    },
    validate: {
      notNull: { msg: 'username is required' },
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: {
      name: 'email',
      msg: 'email already in use!'
    },
  },
  created_at: 'TIMESTAMPTZ',
  updated_at: 'TIMESTAMPTZ'
}, {
  sequelize: dbConnection,
  modelName: 'Users',
})

export default Users
