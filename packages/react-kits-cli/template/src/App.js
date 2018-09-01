import React, { Component } from 'react'
import Helmet from 'react-helmet-async'
import { hot } from 'react-hot-loader'

import renderAppRoutes from './routes'

import './App.scss'

class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>React App</title>
          <meta name="title" content="React App" />
          <meta name="description" content="React App" />
          <meta property="og:title" content="React App" />
          <meta property="og:description" content="React App" />
          <meta name="theme-color" content="#000000" />
        </Helmet>
        <div>{renderAppRoutes()}</div>
      </div>
    )
  }
}

export default hot(module)(App)
