import "tailwindcss/tailwind.css"

// fontawesome
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
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false;
library.add(
  faHome,
  faEdit,
  faUser,
  faEnvelope,
  faWindowMaximize,
  faArrowRight,
  faYoutube,
  faTwitterSquare,
  faInstagramSquare,
  faFacebookSquare,
  faTiktok,
  faCalendarPlus
)

// gtag
import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import * as gtag from '@/lib/gtag'

import { DefaultSeo } from 'next-seo'
import SEO from '@/lib/next-seo.config'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}
