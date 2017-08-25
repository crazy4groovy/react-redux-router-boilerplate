import PropTypes from 'prop-types'
import React from 'react'
import {Route, Link} from 'react-router-dom'

const Topic = ({ match }) => (
  <div className='animated fadeInLeft'>
    <h3>{match.params.topicId}</h3>
  </div>)

Topic.propTypes = {
  match: PropTypes.object.isRequired
}

const Topics = ({ match }) => (
  <div className='page'>
    <h2>Topics</h2>

    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route
      path={`${match.url}/:topicId`}
      component={Topic}
    />

    <Route
      exact
      path={match.url}
      render={() => (
        <h3>Please select a topic.</h3>
      )}
    />
  </div>)

Topics.propTypes = {
  match: PropTypes.object.isRequired
}

export default Topics
