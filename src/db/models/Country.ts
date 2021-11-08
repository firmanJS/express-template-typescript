import {
  DataTypes, Model
} from 'sequelize'
import mongoose from 'mongoose'
import { dbConnection } from '../../config/database'

interface CountryAttributes {
  id?: string
  name?: string
  code?: string
  created_at?: string
  updated_at?: string
}

interface CountrysAttributes extends mongoose.Document {
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

const Countryschema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "can't be blank"],
    unique: true,
    index: true
  },
  code: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    index: true
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Countrys: mongoose.Model<CountrysAttributes> = mongoose.model('Country', Countryschema);

export {
  Country,
  Countrys
}
