import HomeView from './HomeView'
import { HOME_PATH } from '../../constant/url'

export default {
  path: HOME_PATH,
  component: HomeView,
  exact: true,
  auth: true
}
