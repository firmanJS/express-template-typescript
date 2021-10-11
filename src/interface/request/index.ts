import { Request } from 'express'

interface RequestMetaInterface {
  page: number
  limit: number
  offset: number
}

const _meta = (req: Request): RequestMetaInterface => {
  const page: number = +req.query.page || 1
  const limit: number = 10
  const offset: number = page > 1 ? (limit * page) - limit : 0

  const Meta: RequestMetaInterface = { page, limit, offset }

  return Meta
}

export {
  _meta
}
