/* eslint-disable no-console */
import dbConnection from '../config/database'
// import { Users } from './models'

const dbInit = () => {
  dbConnection.authenticate().then(() => {
    const message: string = 'Connection has been established successfully.'
    console.info(message);
    return message
  }).catch((err: string) => {
    const message: string = `Unable to connect to the database:' ${err.toString()}`
    console.error(message)
    return message
  });
  // Users.sync({ alter: true })
}

export default dbInit
