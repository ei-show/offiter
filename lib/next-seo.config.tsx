export default {
  defaultTitle: 'Offiter',
  description: 'IT情報提供ブログ。Next.js + microCMSで作っている完全オリジナルブログ。',
  canonical: 'offiter.net',
  additionalLinkTags: [
    { rel: 'icon', href: '/icons/logo.svg', type: 'image/svg+xml', },
  ],
  twitter: {
    cardType: 'summary_large_image',
    site: '@offiter',
    handle: '@offiter',
  },
  openGraph: {
    url: 'https://offiter.net/',
    type: 'website',
    title: 'Offiter',
    description: 'IT情報提供ブログ。Next.js + microCMSで作っている完全オリジナルブログ。',
    locale: 'ja_JP',
    images: [
      {
        url: 'https://offiter.net/twitter_cards/large_image_1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Og Image Alt',
      },
    ],
    site_name: 'Offiter',
  },
}
