import { Router } from 'express'
import IRouter from './RestInterface'

abstract class BaseRoutes implements IRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  abstract routes(): void
}

export default BaseRoutes
