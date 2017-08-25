import React from 'react'
import {Link} from 'react-router-dom'

import logo from '../logo.svg'
import routes from '../routes'

const Menu = (props) => (
  <ul className='page-menu nav nav-pills'>
    <li>
      <img
        alt='company logo'
        className='logo'
        src={logo}
      />
    </li>
    <li role='presentation' className={window.location.hash === '#/' ? 'active' : ''}>
      <Link to={routes.home}>Home</Link>
    </li>
    <li role='presentation' className={window.location.hash === '#/about' ? 'active' : ''}>
      <Link to={routes.about}>About</Link>
    </li>
    <li role='presentation' className={window.location.hash.startsWith('#/topics') ? 'active' : ''}>
      <Link to={routes.topics}>Topics</Link>
    </li>
  </ul>
)

export default Menu
