import express, { Application } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import 'dotenv/config'
import RestHttp from './modules/V1'
import { Exceptions } from './utils'
import dbInit from './db'

class App {
  public app: Application

  constructor() {
    this.app = express()
    this.plugins()
    this.routes()
  }

  protected plugins(): void {
    dbInit() // for run migrations
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
