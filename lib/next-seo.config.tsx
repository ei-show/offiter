export default {
  defaultTitle: 'Offiter',
  description: 'IT情報提供ブログ。Next.js + microCMSで作っている完全オリジナルブログ。',
  canonical: 'offiter.net',
  additionalLinkTags: [
    { rel: 'icon', href: '/icons/logo.svg', type: 'image/svg+xml', },
  ],
  twitter: {
    cardType: 'summary',
    site: '@offiter',
    handle: '@offiter',
  },
  openGraph: {
    url: 'https://offiter.net/',
    type: 'article',
    title: 'Offiter',
    description: 'IT情報提供ブログ。Next.js + microCMSで作っている完全オリジナルブログ。',
    locale: 'ja_JP',
    images: [
      {
        url: 'https://offiter.net/twitter_cards/icon_144x144.png',
        width: 144,
        height: 144,
        alt: 'Og Image Alt',
      },
    ],
    site_name: 'Offiter',
  },
}
