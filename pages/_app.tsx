import "tailwindcss/tailwind.css"
import { config, library } from '@fortawesome/fontawesome-svg-core'
import {
    faHeadset,
    faEdit,
    faCode,
    faBriefcase,
    faUser,
    faBlog,
    faEnvelope,
    faWindowMaximize,
    faWifi,
} from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

// fontAwesome
config.autoAddCss = false;
library.add(
    faHeadset,
    faEdit,
    faCode,
    faBriefcase,
    faUser,
    faBlog,
    faEnvelope,
    faWindowMaximize,
    faWifi,
    faYoutube,
)


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
