import { Metadata } from 'next'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'zenn-content-css'
import '../styles/globals.css'
import { GA_TRACKING_ID } from '@/src/libs/gtag'
import { FontAwesomeSetup, GoogleAnalytics, ZennEmbedLoader } from '@/src/index'

config.autoAddCss = false

const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL ?? ''

export const metadata: Metadata = {
  title: {
    default: 'Offiter',
    template: '%s - Offiter',
  },
  description: 'IT情報提供ブログ。情シスやクラウドのエンジニア経験を活かした情報共有ブログ。',
  icons: [{ rel: 'icon', url: '/icons/logo.svg', type: 'image/svg+xml' }],
  twitter: {
    card: 'summary_large_image',
    site: '@offiter',
    creator: '@offiter',
  },
  openGraph: {
    type: 'website',
    url: 'https://offiter.net/',
    title: 'Offiter - IT情報共有ブログ',
    description: '情シスやクラウドのエンジニア経験を活かした情報共有ブログ。',
    locale: 'ja_JP',
    siteName: 'Offiter',
    images: [
      {
        url: `${baseURL}/twitter_cards/large_image_1200x630.png`,
        width: 1200,
        height: 630,
        alt: 'Og Image Alt',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&family=Kosugi+Maru&family=Noto+Sans+JP:wght@100&display=swap"
          rel="stylesheet"
        />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });`,
              }}
            />
          </>
        )}
        {/* zenn-editor */}
        <script src="https://embed.zenn.studio/js/listen-embed-event.js" />
      </head>
      <body>
        <FontAwesomeSetup />
        <GoogleAnalytics />
        <ZennEmbedLoader />
        {children}
      </body>
    </html>
  )
}
