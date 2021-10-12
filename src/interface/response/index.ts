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
  count_per_page?: number
  count_total?: number
}

interface WithMetaInterface extends WithDataInterface {
  _link?: string,
  _meta?: MetaInterface
}

interface PaginationResponseInterface {
  data?: object,
  count?: number
}

export {
  ExceptionsInterface,
  WithDataInterface,
  WithMetaInterface,
  PaginationResponseInterface
}
