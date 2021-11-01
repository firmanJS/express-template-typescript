/* eslint-disable no-console */
import { Sequelize } from 'sequelize'
import mongoose from 'mongoose'
import { DatabaseInterface, MongoOptionsInterface } from '../interface/config'

const configDb: DatabaseInterface = {
  dbName: process.env.DB_NAME!,
  dbUser: process.env.DB_USERNAME,
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: Number(process.env.DB_PORT),
  nodeEnv: process.env.NODE_ENV || 'development',
  logSql: process.env.NODE_ENV === 'development' ? console.log : false,
}
const dbConnection = new Sequelize(configDb.dbName!,
  configDb.dbUser!, configDb.dbPassword!, {
    host: configDb.dbHost,
    port: configDb.dbPort,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false
    },
    dialectOptions: {
      collate: 'utf8mb4_unicode_ci',
      underscored: true,
      freezeTableName: true
    },
    logging: configDb.logSql
  })

const configMongo: DatabaseInterface = {
  mongoUrl: process.env.MONGO_URL!
}
const environmentDb: string = process.env.NODE_ENV || ''

const connectMonggo = async (): Promise<string> => {
  try {
    const options: MongoOptionsInterface = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
      maxPoolSize: 50,
      wtimeoutMS: 2500,
    }
    await mongoose.connect(configMongo.mongoUrl!, options)
    return 'MongoDB Connected...'
  } catch (err: any) {
    const manipulate: string = err.toString().split(':')
    return `${manipulate[0]} Mongo is disconnected`
  }
}

mongoose.connection.on('disconnected', () => console.error('Lost MongoDB connection'))

mongoose.connection.on('reconnected', (err) => {
  console.info(`Reconnected to MongoDB ${err}`)
})

if (environmentDb === 'development') {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.info(`${collectionName}.${method}`, JSON.stringify(query), doc)
  })
}

export {
  dbConnection,
  connectMonggo
}
