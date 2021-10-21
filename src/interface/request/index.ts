import { Request } from 'express'

interface RequestMetaInterface {
  page: number
  limit: number
  offset: number
  search: string
}

interface RequestParamsInterface {
  id?: number
}

const Meta = (req: Request): RequestMetaInterface => {
  const page: number = +req?.query?.page! || 1
  const limit: number = +req?.query?.limit! || 10
  const search: string = req?.query?.search as string || ''
  const offset: number = page > 1 ? (limit * page) - limit : 0

  const MetaData: RequestMetaInterface = {
    page, limit, offset, search
  }

  return MetaData
}

export {
  Meta,
  RequestMetaInterface,
  RequestParamsInterface
}
