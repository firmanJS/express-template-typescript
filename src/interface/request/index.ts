import { Request } from 'express'

interface RequestMetaInterface {
  page: number
  limit: number
  offset: number
  search?: string
}

const _meta = (req: Request): RequestMetaInterface => {
  const page: number = +req.query.page || 1
  const limit: number = +req.query.limit || 10
  const search: string = req.query?.search
  const offset: number = page > 1 ? (limit * page) - limit : 0

  const Meta: RequestMetaInterface = {
    page, limit, offset, search
  }

  return Meta
}

export {
  _meta,
  RequestMetaInterface
}
