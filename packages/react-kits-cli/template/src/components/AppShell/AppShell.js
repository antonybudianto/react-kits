import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AppShell extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  constructor(props) {
    super(props)

    this.state = {
      ssrDone: false
    }
  }

  componentDidMount() {
    this.setState({
      ssrDone: true
    })
  }

  render() {
    return (
      <div>
        <header
          style={{
            color: 'white',
            backgroundColor: 'black',
            padding: '20px'
          }}
        >
          MyAppShell
        </header>
        <div>{this.state.ssrDone ? this.props.children : null}</div>
      </div>
    )
  }
}

export default AppShell
