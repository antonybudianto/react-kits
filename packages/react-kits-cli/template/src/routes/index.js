import { renderRoutes, matchRoutes } from 'react-router-config'
import { UAParser } from 'ua-parser-js'

import HomeRoute from './Home'
import NotFoundRoute from './NotFoundPage'
import AboutRoute from './About'
import OfflineRoute from './Offline'
import { initUserAgent } from '../reducers/user-agent'

const routes = [{ ...HomeRoute }, { ...AboutRoute }, { ...OfflineRoute }, { ...NotFoundRoute }]

export const getInitialData = (req, store) => {
  const path = req.path
  const ua = new UAParser(req.headers['user-agent']).getResult()
  store.dispatch(initUserAgent(ua))
  return matchRoutes(routes, path).map(({ route }) => {
    const promises = []
    if (route.loadData) {
      promises.push(route.loadData(store, req))
    }
    return Promise.all(promises)
  })
}

export default function renderAppRoutes() {
  return renderRoutes(routes)
}
