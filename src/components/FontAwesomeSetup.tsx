'use client'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faEdit,
  faUser,
  faEnvelope,
  faWindowMaximize,
  faArrowRight,
  faCalendarPlus,
} from '@fortawesome/free-solid-svg-icons'
import {
  faYoutube,
  faTwitterSquare,
  faInstagramSquare,
  faFacebookSquare,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false
library.add(
  faHome,
  faEdit,
  faUser,
  faEnvelope,
  faWindowMaximize,
  faArrowRight,
  faCalendarPlus,
  faYoutube,
  faTwitterSquare,
  faInstagramSquare,
  faFacebookSquare,
  faTiktok,
)

export default function FontAwesomeSetup() {
  return null
}
