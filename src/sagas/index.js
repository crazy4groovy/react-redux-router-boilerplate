/* @flow */

import * as effects from 'redux-saga/effects'

import about from './about'
import { ClientError } from '../api/client'
import { creators } from '../actions'
import { ns } from '../i18n'

import * as notify from '../common/notify'

const t = ns('errors')

const sagaDefs/* : Array<SagaDefType> */ = [
  ...about
]

function notifyErr400 (body /* : Object */) {
  const message = (body.type === 'VALIDATION_FAILED')
    ? Object.keys(body.errors).join(' ')
    : body.message

  const title = t(`notification.errorTypes.${body.type}`)
  notify.alert(title, message)
  return true
}

function notifyErr (key /* : string */) {
  notify.alert(t(`notification.${key}.title`), t(`notification.${key}.message`))
  return true
}

function* handleClientErrors (err/* : Error */) {
  if (!(err instanceof ClientError)) return false
  const { status, data: body } = err.response

  switch (status) {
    case 400: {
      return notifyErr400(body)
    }

    case 401: {
      if (err.request.url.includes('/auth/login')) {
        return notifyErr('401Login')
      }

      // a general unauthorized error
      yield effects.put(creators.logoutEvent())
      setTimeout(() => notifyErr('401'), 100)
      return true
    }

    case 403:
    case 404:
      return notifyErr(`${status}`)

    default: {
      if (err.response.status >= 500) {
        return notifyErr('500')
      }
    }
  }

  return false
}

const defaultErrorAction = (err, action) =>
  ({ type: 'defaultOnFailHandler', actionType: action.type, message: err.message })

function* runSaga (
  action /* : Object */,
  doWork /* : function */,
  onFail /* : function */) /* : Generator<> */ {
  try {
    yield effects.call(doWork, action)
  } catch (err) {
    yield handleClientErrors(err)
    yield effects.put(onFail(err, action) || defaultErrorAction(err, action))
  }
}

function defaultOnFailHandler (err /* : Error */, action) {
  console.error('DEFAULT ON-FAIL HANDLER', err, action) // eslint-disable-line no-console
  return defaultErrorAction(err, action)
}

function sagaFactory (sagaDef/* : SagaDefType */)/* : function */ {
  const anonymousUser = (sagaDef.anonymousUser === true)
  const statePreChecks = Array.isArray(sagaDef.statePreChecks) ? sagaDef.statePreChecks : ([])
  const onFail = typeof sagaDef.onFail === 'function' ? sagaDef.onFail : defaultOnFailHandler

  const saga = function* saga ()/* : Generator<> */ {
    // default redux-saga effect is takeEvery
    const sagaEffect = sagaDef.effect || effects.takeEvery
    try {
      yield sagaEffect(
        sagaDef.actionType,
        function* tracker (action) {
          yield runSaga(action, sagaDef.work, anonymousUser, statePreChecks, onFail)
        },
      )
    } catch (err) {
      console.error(`SAGA FACTORY ERROR: ${err}`) // eslint-disable-line no-console
    }
  }

  return saga
}

const sagas/* : Array<Generator<>> */ = sagaDefs
.map(sagaFactory)
.map(saga => saga())

export default function* rootSaga ()/* : Generator<> */ {
  yield effects.all(sagas)
}

export const testUtils/* : TestUtilsType */ = {
  sagaFactory,
  reduceActionsForTypes (actions) {
    return actions.reduce((array, action) => {
      if (!action.type.startsWith('actionTracker')) {
        array.push(action.type)
      }
      return array
    }, [])
  }
}
