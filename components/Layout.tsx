import Head from 'next/head'
import Link from 'next/link'
import Header from './Header'
import Aside from './Aside'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const siteName: string = 'Offiter'

export default function Layout({ data, tags, children }) {
  const title = data.title ? `${data.title} - ${siteName}` : siteName
  const description = data.description ? data.description : siteName
  return (
    <>
      {/* Head Start */}
      <Head>
        <html lang="jp" />
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta name="og:image" content="" />
        <meta name="twitter:card" content="" />
        <meta charSet="UTF-8" />
      </Head>
      {/* Head End */}
      <div className="bg-gray-100 overflow-x-hidden">
        <Header siteName={siteName} />
        <div className="px-6 py-8">
          <div className="flex justify-between container mx-auto">
            {/* Main Start */}
            <div className="w-full lg:w-8/12">
              {children}
            </div>
            {/* Main End */}
            <Aside tags={tags} />
          </div>
        </div>
        <footer className="px-6 py-2 bg-gray-800 text-gray-100">
          <div className="flex flex-col justify-between items-center container mx-auto md:flex-row">
            <Link href="/">
              <a className="text-2xl font-bold">{siteName}</a>
            </Link>
            <p className="mt-2 md:mt-0">All rights reserved 2021.</p>
            <div className="flex -mx-2 mt-4 mb-2 md:mt-0 md:mb-0">
              <Link href="https://twitter.com">
                <a className="mx-2 text-gray-100 hover:text-gray-400">
                  <FontAwesomeIcon icon={['fab', 'twitter-square']} />
                </a>
              </Link>
              <Link href="https://twitter.com">
                <a className="mx-2 text-gray-100 hover:text-gray-400">
                  <FontAwesomeIcon icon={['fab', 'youtube']} />
                </a>
              </Link>
              <Link href="https://twitter.com">
                <a className="mx-2 text-gray-100 hover:text-gray-400">
                  <FontAwesomeIcon icon={['fab', 'instagram-square']} />
                </a>
              </Link>
              <Link href="https://twitter.com">
                <a className="mx-2 text-gray-100 hover:text-gray-400">
                  <FontAwesomeIcon icon={['fab', 'facebook-square']} />
                </a>
              </Link>
              <Link href="https://twitter.com">
                <a className="mx-2 text-gray-100 hover:text-gray-400">
                  <FontAwesomeIcon icon={['fab', 'tiktok']} />
                </a>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}