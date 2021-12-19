import { ReactNode } from 'react'
import Header from './Header'
import Aside from './Aside'
import Footer from './Footer'
import Nav from './Nav'
import type { tag, blog, blogData } from '@/lib/types'

type props = {
  blogDetails?: blogData
  latestBlogs: blog[],
  tags: tag[],
  children: ReactNode
}

export default function Layout({ blogDetails, latestBlogs, tags, children }: props):JSX.Element {
  const siteName = 'Offiter'
  return (
    <>
      <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 overflow-x-hidden font-body">
        <Header siteName={siteName} />
        <div className="px-6 py-8">
          <div className="flex justify-around container mx-auto">
            {/* Main Start */}
            <div className="w-full min-h-screen lg:w-8/12">
              {children}
            </div>
            {/* Main End */}
            <Aside blogDetails={blogDetails} latestBlogs={latestBlogs} tags={tags} />
          </div>
        </div>
        <Footer siteName={siteName} />
        <Nav />
        <div className="h-16 md:hidden" />
      </div>
    </>
  )
}
