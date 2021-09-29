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

export interface RegisterInput {
  username?: string
  password?: string
}

export interface RegisterOutput {
  username?: string
  email?: string
  created_at?: Date
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
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  created_at: 'TIMESTAMPTZ',
  updated_at: 'TIMESTAMPTZ'
}, {
  sequelize: dbConnection,
  modelName: 'Users',
})

export default Users
