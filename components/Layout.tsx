import Head from 'next/head'
import Header from './Header'
import Aside from './Aside'
import Footer from './Footer'
import Nav from './Nav'

const siteName: string = 'Offiter'

export default function Layout({ blog, blogs, tags, children }) {
  const title = blog.title ? `${blog.title} - ${siteName}` : siteName
  const description = blog.description ? blog.description : siteName
  return (
    <>
      <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 overflow-x-hidden font-body">
        <Header siteName={siteName} />
        <div className="px-6 py-8">
          <div className="flex justify-between container mx-auto">
            {/* Main Start */}
            <div className="w-full lg:w-8/12">
              {children}
            </div>
            {/* Main End */}
            <Aside blogs={blogs} tags={tags} />
          </div>
        </div>
        <Footer siteName={siteName} />
        <Nav />
        <div className="h-16 md:hidden" />
      </div>
    </>
  )
}