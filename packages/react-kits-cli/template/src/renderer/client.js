import '@babel/polyfill'
import 'raf/polyfill'

import React from 'react'
import { hydrate, render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { loadComponents } from 'loadable-components'
import { HelmetProvider } from 'react-helmet-async'
import { UserAgentProvider } from 'react-ua'

import { createClientStore } from '../createStore'
import App from '../App'
import 'basscss/css/basscss.css'
import { HOME_PATH } from '../constant/url'
const store = createClientStore(window.INITIAL_STATE)

function renderApp(MyApp) {
  const boot = window.__shell__ ? render : hydrate
  boot(
    <HelmetProvider>
      <UserAgentProvider>
        <Provider store={store}>
          <BrowserRouter>
            <MyApp />
          </BrowserRouter>
        </Provider>
      </UserAgentProvider>
    </HelmetProvider>,
    document.querySelector('#root')
  )
}

loadComponents().then(() => {
  renderApp(App)
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(HOME_PATH + 'service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration.scope)

        registration.onupdatefound = () => {
          const installingWorker = registration.installing
          if (installingWorker == null) {
            return
          }
          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  window.location.reload()
                }
                break
            }
          }
        }
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
