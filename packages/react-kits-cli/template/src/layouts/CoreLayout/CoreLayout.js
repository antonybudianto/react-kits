import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import renderAppRoutes from '../../routes'

import './CoreLayout.scss'

class CoreLayout extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>React App</title>
          <meta name="title" content="React App" />
          <meta name="description" content="React App" />
          <meta property="og:title" content="React App" />
          <meta property="og:description" content="React App" />
        </Helmet>
        <div>{renderAppRoutes()}</div>
      </div>
    )
  }
}

export default CoreLayout
