import { call, put } from 'redux-saga/effects'

import { creators, types } from '../actions'

const client = {
  addTodo: (id) => Promise.resolve({
    text: id,
    completed: false
  })
}

const sagaDefs = []
export default sagaDefs

sagaDefs.push({
  actionType: types.addTodoRequest,
  work: function* work (action) {
    const todo = yield call(client.addTodo, action.userId)
    yield put(creators.addTodoSuccess(todo))
  }
})
