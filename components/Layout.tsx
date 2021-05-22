import Head from 'next/head'
import Link from 'next/link'
import Header from './Header'
import Aside from './Aside'
import Footer from './Footer'

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
        <Footer siteName={siteName} />
      </div>
    </>
  )
}