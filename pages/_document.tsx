import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '@/src/index'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ja" data-theme="pastel">
        <Head>
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
          <script src="https://embed.zenn.studio/js/listen-embed-event.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
