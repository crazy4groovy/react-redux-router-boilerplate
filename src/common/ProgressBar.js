import PropTypes from 'prop-types'
import React from 'react'

const pointer = {
  setState: () => {}
}

class component extends React.Component {
  constructor (props) {
    super(props)
    this.state = { show: false, className: '' }
  }

  static propTypes = {
    style: PropTypes.object
  }

  static defaultProps = {
    style: {}
  }

  componentWillMount () {
    pointer.setState = this.setState.bind(this)
  }

  render () {
    const { className, show } = this.state
    const node = show && <div id='progress-bar' className={className} style={this.props.style} />
    return node
  }
}

export default component

const timerFor = (t, cb) => setTimeout(cb, t)

let semiphore = 0
const fadedOutMs = 500
let fadeTimeoutId = 0

export const isShown = () => !!semiphore

export const showBar = () => {
  semiphore += 1
  if (semiphore === 1) {
    clearTimeout(fadeTimeoutId)
    pointer.setState({ className: '', show: true })
  }
  return true
}

export const hideBar = (forced) => {
  if (semiphore === 1) {
    pointer.setState({ className: 'fade' })
    fadeTimeoutId = timerFor(fadedOutMs,
      () => pointer.setState({ className: '', show: false }))
  }
  semiphore = semiphore - (forced === true ? semiphore : 1)
  semiphore = Math.max(0, semiphore)
  return true
}
