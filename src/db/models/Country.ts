import {
  DataTypes, Model
} from 'sequelize'
import { dbConnection } from '../../config/database'
import { AttributesInterface } from '../../repository/postgres'

export interface CountryAttributes {
  id?: string
  name?: string
  code?: string
  source?:string
  created_at?: Date
  updated_at?: Date
}

export interface CountryWithMetaOuput {
  data?: CountryAttributes[]
  count?: number
}
export const DefaultAttributes: AttributesInterface = [
  'id', 'name', 'code', 'source', 'created_at', 'updated_at'
]
class Country extends Model<CountryAttributes> implements CountryAttributes {
  public id!: string

  public name!: string

  public code!: string

  public source!: string

  // timestamps!
  public readonly created_at!: Date

  public readonly updated_at!: Date
}

Country.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'name',
      msg: 'name already in use!'
    },
    validate: {
      notNull: { msg: 'name is required' },
    }
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'code',
      msg: 'code already in use!'
    },
    validate: {
      notNull: { msg: 'code is required' },
    }
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Postgres'
  },
  created_at: 'TIMESTAMPTZ',
  updated_at: 'TIMESTAMPTZ'
}, {
  sequelize: dbConnection,
  modelName: 'Country',
})

export default Country
