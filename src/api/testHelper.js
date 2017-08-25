// Note: this client test is currently using the json-server service as a backend

import enableDestroy from 'server-destroy'
import requireUncached from 'require-uncached'

import * as client from './client'
import { storeToken } from '../common/utils/localStorageUtil'

const { port } = require('./client.config.json').baseUrl.localhost

const {
  throwHttpError,
  ClientError
} = client

const jsonServer = {
  startServer: () => undefined,
  stopServer: () => undefined,
  target: client
}

let serverInstance // private

jsonServer.startServer = (done) => {
  storeToken('fakeJWT')

  // server is accessable at http://localhost:`config.port`
  serverInstance = requireUncached('./json-server/server')
    .listen(port, () => {
      console.log('STARTED json server!', `port: ${port}`) // eslint-disable-line no-console
      if (done) done()
    })

  // Now, enhance the serverInstance with a 'destroy' function
  enableDestroy(serverInstance)
}

jsonServer.stopServer = (done) => {
  storeToken(null)

  serverInstance.destroy(() => {
    console.log('STOPPED json server!') // eslint-disable-line no-console
    if (done) done()
  })
}

export default {
  throwHttpError,
  ClientError,
  jsonServer
}
