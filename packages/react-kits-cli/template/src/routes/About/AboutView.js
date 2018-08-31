import React from 'react'
import loadable from 'loadable-components'

const AppShell = loadable(() => import('../../components/AppShell/AppShell'))

const AboutView = () => (
  <AppShell>
    <div>About view....</div>
  </AppShell>
)

export default AboutView
