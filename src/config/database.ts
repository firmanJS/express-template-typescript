/* eslint-disable no-console */
import { Sequelize } from 'sequelize'
import { DatabaseInterface } from '../interface/config'

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

export default dbConnection
