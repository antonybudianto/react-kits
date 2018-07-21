import 'babel-polyfill'
import React from 'react'

import { createReactServer } from 'react-kits-server'

import createStore from '../store/createStore'
import { getInitialData } from '../routes'
import { HOME_PATH, ASSET_URL } from '../url'
import App from '../App'

const app = createReactServer({
  createStore,
  getInitialData,
  homePath: HOME_PATH,
  assetUrl: ASSET_URL,
  customMiddleware: ins => {
    if (__DEV__) {
      const proxy = require('http-proxy-middleware')
      const backendUrl = process.env.APP_BACKEND_URL || 'https://api.myapp.com'
      console.log('APP_BACKEND_URL = ' + backendUrl)

      ins.use(
        ['/microfinance'],
        proxy({
          secure: false,
          target: backendUrl,
          changeOrigin: true,
          prependPath: false
        })
      )
    }
  },
  onRender: () => <App />
})

if (module.hot) {
  module.hot.accept('../routes', () => {
    console.log('✅ Server hot reloaded ../routes')
  })
  module.hot.accept('../App.js', () => {
    console.log('✅ Server hot reloaded ../App.js')
  })
  module.hot.accept('../store/createStore', () => {
    console.log('✅ Server hot reloaded ../store/createStore')
  })
}

export default app
