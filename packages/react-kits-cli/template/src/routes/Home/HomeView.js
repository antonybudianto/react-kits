import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { UserAgent } from 'react-ua'

import { toggleLogin } from '../../reducers/user'
import './HomeView.scss'
import TestView from './TestView'
import { ABOUT_PATH } from '../../constant/url'

class HomeView extends Component {
  static propTypes = {
    user: PropTypes.object,
    toggleLogin: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    fetch('/api/hello')
      .then(r => r.json())
      .then(data => {
        this.setState({
          text: data.text
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          text: 'Error fetch data'
        })
      })
  }

  render() {
    return (
      <div className="home-view">
        <div className="my2">home view (change HomeView.js and states should not be reset)</div>
        <div>user: {this.props.user.isLoggedIn ? 'loggedIn' : 'notLoggedIn'}</div>
        <div className="my2">
          <button onClick={this.props.toggleLogin}>toggle login</button>
          <Link
            style={{
              color: 'white'
            }}
            to={ABOUT_PATH}
          >
            visit About
          </Link>
        </div>
        <TestView />
        <UserAgent>
          {ua => {
            if (ua) {
              return <div>OS: {ua.os.name}</div>
            }
            return null
          }}
        </UserAgent>
        <div>Fetch hello api: {this.state.text}</div>
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
