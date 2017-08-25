import { combineReducers } from 'redux'

import about, { transducers as transduceAbout } from './about'

const reducers = combineReducers({
  about
})

export default reducers

export const aboutTransducer = state => transduceAbout(state)
