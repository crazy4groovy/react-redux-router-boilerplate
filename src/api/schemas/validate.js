import Ajv from 'ajv'
// import axios from 'axios'

// Note: currently these are local file references, but can easily be changed to remote URLs
// see below.
const schemaUris = {
  accountPutRequest: './account_PUT_Request.json',
  accountPutResponse: './account_PUT_Response.json',
  accountsPostRequest: './accounts_POST_Request.json',
  accountsPostResponse: './accounts_POST_Response.json'
}

/* eslint-disable global-require */
const schemaLocal = {
  './account_PUT_Request.json': require('./account_PUT_Request.json'),
  './account_PUT_Response.json': require('./account_PUT_Response.json'),
  './accounts_POST_Request.json': require('./accounts_POST_Request.json'),
  './accounts_POST_Response.json': require('./accounts_POST_Response.json')
}
/* eslint-enable global-require */

function loadSync (uri, callback) {
  const schema = schemaLocal[uri]
  callback(null, schema)
}

/* function loadAsync(uri, callback) {
  axios(uri)
    .then((resp) => {
      const schema = resp.data
      callback(null, schema)
    })
    .catch((err) => {
      callback(err || new Error(`Error loading JSON Schema: ${uri}`))
    })
} */

function pGetValidators (loadSchema) {
  return new Promise((resolve, reject) => {
    const payloadTypes = Object.keys(schemaUris)
    let remainderCount = payloadTypes.length

    const ajv = new Ajv()
    const validators = {}
    payloadTypes.forEach((payloadType) => {
      loadSchema(schemaUris[payloadType], (err, schemaObj) => {
        if (err) {
          reject(err)
          return
        }
        validators[payloadType] = ajv.compile(schemaObj)

        remainderCount -= 1
        if (remainderCount <= 0) {
          resolve(validators)
        }
      })
    })
  })
}

export default pGetValidators(loadSync)

// TODO: write unit tests for URL fetcher below when ready
// export default pGetValidators(loadAsync)
