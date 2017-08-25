import React from 'react'

import * as notify from '../common/notify'
import { showBar, hideBar, isShown } from '../common/ProgressBar'

const Home = (props) => (
  <div className='page'>

    {notify.confirm('You Are Home?').then(ok =>
      ok ? showBar() && notify.alert('Yes - Now show the Progress Bar!')
        : hideBar()
      ) && null}

    <h2>Home</h2>

    <button
      className='btn'
      onClick={() => (isShown() ? hideBar() : showBar())}
    >
      Toggle Progress Bar
    </button>
  </div>
)

export default Home
