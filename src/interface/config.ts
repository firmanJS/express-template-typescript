interface AuthInterface {
  secretKey?: string |string,
  token?: string,
}

interface DatabaseInterface {
  dbName?: string,
  dbUser?: string,
  dbHost?: string,
  dbPassword?: string,
  dbPort?: number,
  nodeEnv?: string,
  logSql?: any | boolean,
}

export {
  AuthInterface,
  DatabaseInterface
}
