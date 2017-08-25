/* global describe, it, beforeEach, afterEach */
// Note: this client test is currently using the json-server service as a backend
import assert from 'assert'

import testHelper from './testHelper'

const validAccountPayload = Object.freeze({
  id: '0292609B-2DB1-4C67-8808-F90511C20390',
  name: 'My Company Ltd.',
  avatar: 'http://cdn.tractr.io/fj138f1',
  isConsumer: true,
  isMerchant: false,
  operators: [{
    id: 'C0CA6789-5FE1-4D12-B7B8-379402BAD7ED',
    displayName: 'My Company',
    profileImg: 'http://cdn.tractr.io/fj138f1'
  }]
})

describe('# Client', () => {
  describe('::accounts', () => {
    beforeEach(testHelper.jsonServer.startServer)
    afterEach(testHelper.jsonServer.stopServer)

    const createTestAccount = () => (
      testHelper.jsonServer.target.createAccount(null, validAccountPayload)
      .then(data => data.id)
    )

    describe('updateAccount()', () => {
      it('should update an account', () => (
        createTestAccount()
        .then((id) => {
          assert.notEqual(validAccountPayload.id, id)
          const testName = `${Math.random()}`

          const modifiedAccount = JSON.parse(JSON.stringify(validAccountPayload))
          delete modifiedAccount.id
          modifiedAccount.name = testName

          return testHelper.jsonServer.target.updateAccount(null, id, modifiedAccount)
          .then((resp) => {
            assert.strictEqual(resp.id, id)
            assert.strictEqual(resp.name, testName)
          })
        })
      ))
    })
  })

})
