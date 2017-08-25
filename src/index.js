import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import registerServiceWorker from './registerServiceWorker'

import './styles/index.css'
import './styles/pages.css'
import './styles/progressBar.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
