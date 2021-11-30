import {
  DataTypes, Model
} from 'sequelize'
import { dbConnection } from '../../config/database'
import { AttributesInterface } from '../../interface/repository'

export interface UsersAttributes {
  id?: number
  username?: string
  password?: string
  email?: string
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

export interface RegisterOutput {
  username?: string
  email?: string
  created_at?: string
}

export interface LoginOutput {
  id?: number
  username?: string
}

export const DefaultAttributes: AttributesInterface = [
  'id', 'username', 'email', 'password',
  'created_at', 'updated_at'
]
export interface UsersWithMetaOuput {
  data?: UsersAttributes[]
  count?: number
}
// export interface UsersOuput extends Required<UsersAttributes> { }
// export interface UsersOuput extends Pick<UsersAttributes, 'username'> {}

class Users extends Model<UsersAttributes> implements UsersAttributes {
  public id!: number

  public username!: string

  public password!: string

  public email!: string

  // timestamps!
  public readonly created_at!: string

  public readonly updated_at!: string
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
    // validate: {
    //   len: {
    //     args: [0, 7],
    //     msg: 'Minimum 6 characters password'
    //   }
    // }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: {
        msg: 'email invalid'
      }
    },
  },
  created_at: 'TIMESTAMPTZ',
  updated_at: 'TIMESTAMPTZ'
}, {
  sequelize: dbConnection,
  modelName: 'Users',
})

export default Users
