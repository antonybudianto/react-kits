import { renderRoutes, matchRoutes } from 'react-router-config'

import HomeRoute from './Home'
import NotFoundRoute from './NotFoundPage'
import AboutRoute from './About'

const routes = [{ ...HomeRoute }, { ...AboutRoute }, { ...NotFoundRoute }]

export const getInitialData = (req, store) => {
  const path = req.path
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
