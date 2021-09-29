interface ExceptionsInterface {
  error?: string,
  message?: string,
}

interface WithDataInterface {
  status?: string,
  message?: string,
  data?: any | []
}

export {
  ExceptionsInterface,
  WithDataInterface
}
