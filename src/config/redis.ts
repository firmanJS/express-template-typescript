/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
import redis from 'redis'
// import { promisify } from 'util'

const clientConfig = redis.createClient({
  host: process.env.REDIS_HOST!,
  port: +process.env.REDIS_PORT!,
  retry_max_delay: 60,
  max_attempts: 10,
  no_ready_check: true,
})

// const getAsync = promisify(clientConfig.get).bind(clientConfig)

clientConfig.on('connect', () => {
  console.info('redis connected')
})
clientConfig.on('reconnecting', (o) => {
  console.info(`retry number: ${o.attempt}`);
  // clientConfig.flushdb((err, succeeded) => {
  //   console.info(succeeded)
  // });
})
clientConfig.on('error', (err) => console.info(`${err}`))

const dynamicKey = (query: object, unique: string): string => {
  const parseQuery = JSON.stringify(query) // parse query string nodejs to string
  const toJson = JSON.parse(parseQuery) // parse string to object
  const str = [] // define array

  // loop for set to new arrray
  for (const prop in toJson) {
    str.push(toJson[prop])
  }

  const joinStr = str.join('-') // convert array to string with '-'
  let key: string

  if (query) {
    key = `${unique}-${joinStr}`
  } else {
    key = `${unique}`
  }

  return key
}

// const getDataFromRedis = async (key: string, exipred: number, data: object): Promise<object> => {
//   const chechkCache = await getAsync(key)
//   if (chechkCache) {
//     console.info(`redis source ${key}`)
//     return JSON.parse(chechkCache)
//   }
//   clientConfig.setex(key, exipred, JSON.stringify(data)) // set redis key
//   console.info(`api source ${key}`)
//   return data
// }

export {
  // cacheToRedis,
  dynamicKey,
  clientConfig
}
