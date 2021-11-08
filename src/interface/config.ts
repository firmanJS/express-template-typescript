interface AuthInterface {
  secretKey?: string |string,
  token?: string,
}

interface DatabaseInterface {
  mongoUrl?: string,
  dbName?: string,
  dbUser?: string,
  dbHost?: string,
  dbPassword?: string,
  dbPort?: number,
  nodeEnv?: string,
  logSql?: any | boolean,
}

interface MongoOptionsInterface {
  useNewUrlParser: boolean,
  useUnifiedTopology: boolean,
  keepAlive: boolean,
  maxPoolSize: number,
  wtimeoutMS: number,
}

export {
  AuthInterface,
  DatabaseInterface,
  MongoOptionsInterface
}
