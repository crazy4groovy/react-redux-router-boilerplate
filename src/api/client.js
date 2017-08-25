/* global process */

import axios from 'axios'

import getValidators from './schemas/validate'

const env = window.location.hostname || 'localhost'
const { aws, jsonServer, port, clientId } = require('./client.config.json').baseUrl[env]

export const endpoints = Object.freeze({ aws, jsonServer, port })

export function ClientError (message, request, response) {
  Object.assign(this, { request }, { response })
  this.message = message || 'UNKNOWN'
  this.stack = (new Error()).stack
}
ClientError.prototype = Object.create(Error.prototype)
ClientError.prototype.constructor = ClientError

// Note: exported only for testing purposes
export function throwHttpError (error = { response: {} }, request) {
  const { response } = error
  if (response && response.status && response.status >= 400) {
    throw new ClientError(`Server error response (status: ${response.status})`, request, response)
  }

  throw new ClientError(`HTTP Client Error (non-status): ${error.message}`)
}

const methods = Object.freeze({
  get: 'get',
  post: 'post',
  put: 'put',
  patch: 'patch',
  delete: 'delete'
})

const request = (token, validator, method, url, data, contentType = 'application/json') => {
  const opts = {
    method,
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType
    },
    withCredentials: true
  }

  if (data) opts.data = data

  if (token) opts.headers.Authorization = `Bearer ${token}`

  if (clientId) opts.headers['X-Client-Id'] = clientId

  console.log('AXIOS', opts)
  return axios(opts)
  .catch(err => throwHttpError(err, opts))
  .then((resp) => {
    if (!validator(resp.data)) {
      const msg = [
        `invalid JSON response from [${method}] ${url}:`,
        JSON.stringify(validator.errors, null, 2),
        JSON.stringify(resp.data, null, 2)
      ].join('\n')
      return Promise.reject(new Error(msg))
    }

    return Object.assign({ _headers: resp.headers }, resp.data || {})
  })
}

const logError = (err) => {
  console.error('CLIENT ERROR:', err.message) // eslint-disable-line no-console
  throw err
}

export const getAccount = (token, id) => (
  getValidators
  .then(validators => (
    request(
      token,
      validators.accountGetResponse,
      methods.get,
      `${aws}:${port}/accounts/${id}`,
    )
  ))
  .catch(logError)
)

export const getAccounts = token => (
  getValidators
  .then(validators => (
    request(
      token,
      validators.accountsGetResponse,
      methods.get,
      `${aws}:${port}/accounts/`,
    )
  ))
  .catch(logError)
)

export const createAccount = (token, payload) => (
  getValidators
  .then((validators) => {
    if (!validators.accountsPostRequest(payload)) {
      throw new Error('invalid request payload: accountsPostRequest')
    }
    return request(
      token,
      validators.accountsPostResponse,
      methods.post,
      `${aws}:${port}/accounts/`, payload,
    )
  })
  .catch(logError)
)

export const updateAccount = (token, id, payload) => (
  getValidators
  .then((validators) => {
    if (!validators.accountPutRequest(payload)) {
      throw new Error('invalid request payload: accountPutRequest')
    }
    return request(
      token,
      validators.accountPutResponse,
      methods.put,
      `${aws}:${port}/accounts/${id}`,
      payload,
    )
  })
  .catch(logError)
)

// ====================================================

export const uploadFile = (token, payload) => (
  getValidators
    .then(validators => (
      request(
        token,
        validators.filesPOSTResponse,
        methods.post,
        `${aws}:${port}/files`,
        payload,
        'multipart/form-data'
      )
    ))
    .catch(logError)
)

// ====================================================

// shim for fake API compliance
export const fetchAccount = getAccount
export const fetchAccounts = getAccounts
