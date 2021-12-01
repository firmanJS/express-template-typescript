export interface MetaInterface {
  CURRENT_PAGE?:number | 1
  LIMIT?: number | 10
  PAGE?: number | 1
  TOTAL_PAGE: number | 1,
  COUNT_PER_PAGE: number | 10,
  COUNT_TOTAL: number | 10
}

export const MORGAN_FORMAT: string = '[:date[clf]] :remote-addr :remote-user \x1b[36m:method \x1b[36m:url \x1b[33m:status \x1b[32m:response-time\x1b[36m(ms)\x1b[0m'
