/* eslint-disable no-console */
import cluster from 'cluster'
import os from 'os'

import app from './app'

const port: number = Number(process.env.APP_PORT)

let server: any

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: any) => {
  console.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  console.info('SIGTERM received')
  if (server) {
    server.close()
  }
})

if (process.env.CLUSTER_MODE === 'on' && cluster.isMaster) {
  const cpuCore: number = os.cpus().length;
  for (let i = 0; i < cpuCore; i += 1) {
    cluster.fork();
  }
  cluster.on('online', (worker) => {
    if (worker.isConnected()) console.info(`worker is active ${worker.process.pid}`);
  })
  cluster.on('exit', (worker) => {
    if (worker.isDead()) console.info(`worker is dead ${worker.process.pid}`);
    cluster.fork();
  })
} else {
  app.listen(process.env.APP_PORT, () => {
    console.info(`express boillerplate Typescript app running in port ${port}`)
  })
}
