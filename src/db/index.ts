/* eslint-disable no-console */
import dbConnection from '../config/database'
// import { Users } from './models'

const dbInit = () => {
  dbConnection.authenticate().then(() => {
    console.info('Connection has been established successfully.');
  }).catch((err: string) => {
    console.error('Unable to connect to the database:', err.toString());
  });
  // Users.sync({ alter: true })
}

export default dbInit
