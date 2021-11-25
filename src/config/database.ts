/* eslint-disable no-console */
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { DatabaseInterface, MongoOptionsInterface } from '../interface/config'

dotenv.config()

const configMongo: DatabaseInterface = {
  mongoUrl: process.env.MONGO_URL!
}
const environmentDb: string = process.env.NODE_ENV || ''

const connectMonggo = async () => {
  try {
    const options: MongoOptionsInterface = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
      maxPoolSize: 50,
      wtimeoutMS: 2500,
    }
    await mongoose.connect(configMongo.mongoUrl!, options)
    console.info('MongoDB Connected...✅✅✅')
  } catch (err: any) {
    const manipulate: string = err.toString().split(':')
    console.error(`${manipulate[0]} Mongo is disconnected`)
  }
}

mongoose.connection.on('disconnected', () => console.error('Lost MongoDB connection'))

mongoose.connection.on('reconnected', async (err) => {
  console.info(`Reconnected to MongoDB ${err}`)
  connectMonggo()
})

if (environmentDb === 'development') {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.info(`${collectionName}.${method}`, JSON.stringify(query), doc)
  })
}

export {
  connectMonggo
}
