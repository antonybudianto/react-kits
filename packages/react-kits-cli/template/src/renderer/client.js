import 'babel-polyfill'
import 'raf/polyfill'

import React from 'react'
import { hydrate, render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { loadComponents } from 'loadable-components'
import { HelmetProvider } from 'react-helmet-async'

import { createClientStore } from '../createStore'
import App from '../App'
import 'basscss/css/basscss.css'
const store = createClientStore(window.INITIAL_STATE)

function renderApp(MyApp) {
  const boot = window.__shell__ ? render : hydrate
  boot(
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <MyApp />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>,
    document.querySelector('#root')
  )
}

loadComponents().then(() => {
  renderApp(App)
})

require('offline-plugin/runtime').install()
