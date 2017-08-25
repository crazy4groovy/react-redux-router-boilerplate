import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import { creators } from '../actions'
import { aboutTransducer } from '../reducers'

const About = (props) => (
  <div className='page'>
    <h2>About</h2>
    <button className='btn btn-primary' onClick={() => props.addTodo(Math.random() * 100000 | 0)}>Add</button>
    <br />
    <br />
    <pre>Index 1: {JSON.stringify(props.getTodo(1))}</pre>
    <pre>Index -2: {JSON.stringify(props.getTodo(-2))}</pre>
    <pre>Index -1: {JSON.stringify(props.getTodo(-1))}</pre>
    <pre>{JSON.stringify(props.todos, null, 2)}</pre>
  </div>
)
About.propTypes = {
  todos: PropTypes.array.isRequired,
  addTodo: PropTypes.func.isRequired,
  getTodo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  todos: state.about,
  getTodo: i => aboutTransducer(state).getAt(i)
})

const mapDispatchToProps = {
  addTodo: creators.addTodoRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
