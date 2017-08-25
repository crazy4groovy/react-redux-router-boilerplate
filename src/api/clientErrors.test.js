// Note: this client test is currently using the json-server service as a backend

import assert from 'assert'

import testHelper from './testHelper'

describe('# Client', () => {
  describe('createError()', () => {
    it('should throw an error for HTTP response status >= 400', (done) => {
      [400, 404, 500].every((statusCode) => {
        assert.throws(
          () => {
            testHelper.throwHttpError({
              response: {
                status: statusCode,
              },
            })
          },
          err => (err instanceof Error) &&
          (err instanceof testHelper.ClientError) &&
          err.response.status === statusCode
          ,
          'oops - unexpected Error'
        )

        return true
      })

      done()
    })

    it('should throw an error wout status for HTTP response status < 400', (done) => {
      [200, 301].every((statusCode) => {
        assert.throws(
          () => {
            testHelper.throwHttpError({
              response: {
                status: statusCode,
              },
            })
          },
          err => (err instanceof Error) &&
          (err instanceof testHelper.ClientError) &&
          !err.response === true
          ,
          'oops - unexpected Error'
        )

        return true
      })

      done()
    })
  })
})
