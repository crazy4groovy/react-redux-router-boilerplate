import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { I18nextProvider } from 'react-i18next'

import Menu from './common/Menu'
import ProgressBar from './common/ProgressBar'
import Topics from './pages/Topics'
import About from './pages/About'
import Home from './pages/Home'

import reducers from './reducers'
import sagas from './sagas'
import i18n from './i18n'
import routes from './routes'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(sagas)

const App = () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router>
        <div id='app'>
          <Menu />
          <Route exact path={routes.home} component={Home} />
          <Route path={routes.about} component={About} />
          <Route path={routes.topics} component={Topics} />
          <ProgressBar style={{ border: 'none', borderTop: '2px solid violet' }} />
        </div>
      </Router>
    </Provider>
  </I18nextProvider>
)

export default App
