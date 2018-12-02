import React from 'react'
import { Link } from 'react-router-dom'
import { HOME_PATH } from '../../constant/url'

const AboutView = () => (
  <div>
    About view.... <Link to={HOME_PATH}>Back to home</Link>
  </div>
)

export default AboutView
