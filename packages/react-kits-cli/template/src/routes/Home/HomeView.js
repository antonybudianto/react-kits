import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { toggleLogin } from '../../reducers/user'
import './HomeView.scss'
import TestView from './TestView'

class HomeView extends Component {
  static propTypes = {
    user: PropTypes.object,
    toggleLogin: PropTypes.func
  }

  render() {
    return (
      <div className="home-view">
        <div className="my2">
          home view (change HomeView.js and states should not be reset)
        </div>
        <div>
          user: {this.props.user.isLoggedIn ? 'loggedIn' : 'notLoggedIn'}
        </div>
        <div className="my2">
          <button onClick={this.props.toggleLogin}>toggle login</button>
          <Link
            style={{
              color: 'white'
            }}
            to="/about"
          >
            visit About
          </Link>
        </div>
        <TestView />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = {
  toggleLogin
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView)
