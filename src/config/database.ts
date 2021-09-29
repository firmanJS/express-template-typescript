/* eslint-disable no-console */
import { Sequelize } from 'sequelize'

const dbName: string = process.env.DB_NAME || ''
const dbUser: string = process.env.DB_USERNAME || ''
const dbHost: string = process.env.DB_HOST || 'localhost'
const dbPassword: string = process.env.DB_PASSWORD || ''
const dbPort: number = Number(process.env.DB_PORT)
const nodeEnv: string = process.env.NODE_ENV || 'development'
const logSql: any | boolean = nodeEnv === 'development' ? console.log : false

const dbConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define : {
    timestamps: false
  },
  dialectOptions: {
    collate: 'utf8mb4_unicode_ci',
    underscored: true,
    freezeTableName: true
  },
  logging: logSql
})

export default dbConnection
