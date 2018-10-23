import React from 'react'
import loadable from 'loadable-components'
import { Link } from 'react-router-dom'
import { HOME_PATH } from '../../constant/url'

const AppShell = loadable(() => import('../../components/AppShell/AppShell'))

const AboutView = () => (
  <AppShell>
    <div>
      About view.... <Link to={HOME_PATH}>Back to home</Link>
    </div>
  </AppShell>
)

export default AboutView
