import mongoose from 'mongoose'

export interface CountryAttributes {
  _id?: mongoose.Types.ObjectId
  name?: string
  code?: string
  source?:string
  created_at?: string
  updated_at?: string
}

export interface CountryInput {
  name?: string
  code?: string
  source?:string
  created_at?: string
  updated_at?: string
}

export interface CountryOuput {
  _id?: string
  name?: string
  code?: string
  source?:string
  created_at?: string
  updated_at?: string
}

export interface CountryWithMetaOuput {
  data?: CountryAttributes[],
  count?: number,
}

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
  },
  source: {
    type: String,
    index: true,
    default: 'mongo'
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

// output setting
const Country: mongoose.Model<CountryAttributes> = mongoose.model('Country', Countryschema)

export default Country
