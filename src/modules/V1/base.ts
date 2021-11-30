import { Router } from 'express'
import RestInterface from '../../interface/http'

abstract class BaseRoutes implements RestInterface {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  abstract routes(): void
}

export default BaseRoutes
