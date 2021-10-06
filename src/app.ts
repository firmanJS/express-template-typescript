/* eslint-disable no-console */
import express, { Application, Request, Response } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import 'dotenv/config'
import dbInit from './db'
import RestHttp from './transport/rest/v1'
import Exceptions from './utils/exceptions'

class App {
  public app: Application

  constructor() {
    this.app = express()
    this.plugins()
    this.routes()
  }

  protected plugins(): void {
    dbInit()
    this.app.use(compression())
    this.app.use(helmet())
    this.app.use(cors())
    this.app.options('*', cors()) // cors setup
    this.app.use(express.json({ limit: '200kb' }))
  }

  protected routes(): void {
    this.app.route('/').get((req: Request, res: Response) => {
      res.send('ini adalah route menggunakan TS')
    })

    this.app.use(RestHttp)
    this.app.use(Exceptions.notFoundHandler)
    this.app.use(Exceptions.syntaxError)
    this.app.use(Exceptions.errorHandler)
  }
}

const { app } = new App()

export default app
