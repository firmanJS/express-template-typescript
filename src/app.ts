import express, { Application } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import RestHttp from './transport/rest/v1'
import { Exceptions, MORGAN_FORMAT } from './utils'
// import dbInit from './db'
import configClient from './config/elastic'

class App {
  public app: Application

  constructor() {
    this.app = express()
    this.plugins()
    this.routes()
  }

  protected plugins(): void {
    // dbInit() // for run migrations
    configClient
      .info()
      .then((response) => console.info(`elasticsearhc is ${response.meta.connection.status}`))
      .catch((error) => console.error(`Error: ${error}`));

    this.app.use(morgan(MORGAN_FORMAT, { stream: process.stderr }))
    this.app.use(compression())
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(express.json({ limit: '200kb' }))
  }

  protected routes(): void {
    this.app.use(RestHttp)
    this.app.use(Exceptions.notFoundHandler)
    this.app.use(Exceptions.syntaxError)
    this.app.use(Exceptions.errorHandler)
  }
}

const { app } = new App()

export default app
