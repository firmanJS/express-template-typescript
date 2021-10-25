interface ExceptionsInterface {
  error?: string,
  message?: string,
}

interface WithDataInterface {
  status?: string,
  message?: string,
  data?: any | []
}
interface MetaInterface {
  current_page?: number,
  page?: number
  limit_per_page?: number
  total_page?: number
  count_total?: number
}

interface WithMetaInterface extends WithDataInterface {
  _link?: string,
  meta?: MetaInterface
}

interface PaginationResponseInterface {
  rows: object,
  count: number,
}

interface ResultBoolInterface {
  status?: boolean
}

interface DataInterface {
  data?: object
}

export {
  ExceptionsInterface,
  WithDataInterface,
  WithMetaInterface,
  PaginationResponseInterface,
  ResultBoolInterface,
  DataInterface
}
