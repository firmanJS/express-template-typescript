import {
  DataTypes, Model
} from 'sequelize'
import dbConnection from '../../config/database'

interface CountryAttributes {
  id?: string
  name?: string
  code?: string
  created_at?: string
  updated_at?: string
}

export interface CountryInput extends CountryAttributes {}

export interface CountryOuput extends CountryAttributes {}

class Country extends Model<CountryAttributes> implements CountryAttributes {
  public id!: string

  public name!: string

  public code!: string

  // timestamps!
  public readonly created_at!: string

  public readonly updated_at!: string
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
  created_at: 'TIMESTAMPTZ',
  updated_at: 'TIMESTAMPTZ'
}, {
  sequelize: dbConnection,
  modelName: 'Country',
})

export default Country
