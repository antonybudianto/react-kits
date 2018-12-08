import '@babel/polyfill'
import React from 'react'

import { createReactServer } from 'react-kits-server'
import { UserAgentProvider } from 'react-ua'

import createStore from '../createStore'
import { getInitialData } from '../routes'
import { HOME_PATH } from '../constant/url'
import App from '../App'

const app = createReactServer({
  createStore,
  getInitialData,
  homePath: HOME_PATH,
  assetUrl: process.env.APP_ASSET_PATH,
  customMiddleware: ins => {
    const proxy = require('http-proxy-middleware')
    const backendUrl = process.env.APP_BACKEND_URL || 'https://www.myapp.com'
    console.log('APP_BACKEND_URL = ' + backendUrl)

    ins.get('/', (req, res) => {
      res.redirect(HOME_PATH)
    })

    ins.get('/api/hello', (req, res) => {
      res.json({
        text: 'Hello world'
      })
    })

    ins.use(
      ['/api'],
      proxy({
        secure: false,
        target: backendUrl,
        changeOrigin: true,
        prependPath: false
      })
    )
  },
  onRender: ctx => (
    <UserAgentProvider value={ctx.expressCtx.req.headers['user-agent']}>
      <App />
    </UserAgentProvider>
  )
})

if (module.hot) {
  module.hot.accept('../routes', () => {
    console.log('✅ Server hot reloaded ../routes')
  })
  module.hot.accept('../App.js', () => {
    console.log('✅ Server hot reloaded ../App.js')
  })
  module.hot.accept('../createStore', () => {
    console.log('✅ Server hot reloaded ../createStore')
  })
}

export default app
