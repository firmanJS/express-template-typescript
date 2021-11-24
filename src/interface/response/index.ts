interface ExceptionsInterface {
  error?: string,
  message?: string,
}

interface WithDataInterface {
  status?: string,
  message?: string,
  data?: [] | object
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

// export interface NumberResponseInterface {
//   [name: string]: number
// }

export interface DeletedResponseInterface {
  deletedCount: number
}

export interface UpdatedResponseInterface {
  acknowledged?: boolean,
  modifiedCount: number,
  upsertedId?: unknown,
  upsertedCount?: number,
  matchedCount?: number
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
