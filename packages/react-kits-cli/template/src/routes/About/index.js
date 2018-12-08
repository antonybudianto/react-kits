import loadable from 'loadable-components'
import { ABOUT_PATH } from '../../constant/url'

const AboutView = loadable(() => import('./AboutView'))

export default {
  path: ABOUT_PATH,
  component: AboutView
}
