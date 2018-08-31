import loadable from 'loadable-components'

const AboutView = loadable(() => import('./AboutView'))

export default {
  path: '/about',
  component: AboutView
}
