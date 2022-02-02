import { ReactNode } from 'react'
import { Header, Aside, Footer, Nav } from '@/src/index'
import type { tag, blog, blogData, TOC } from '@/src/index'

type props = {
  blogDetails?: blogData
  latestBlogs: blog[]
  tags: tag[]
  toc?: TOC[]
  children: ReactNode
}

export default function Layout({ blogDetails, latestBlogs, tags, toc, children }: props): JSX.Element {
  const siteName = 'Offiter'
  return (
    <>
      <div className="overflow-x-hidden bg-gradient-to-r from-gray-50 via-white to-gray-50 font-body lg:bg-gradient-to-b lg:from-cyan-50 lg:via-cyan-300 lg:to-blue-900">
        <Header siteName={siteName} />
        <div className="px-6 py-8">
          <div className="container mx-auto flex justify-around">
            {/* Main Start */}
            <div className="min-h-screen w-full lg:w-8/12">{children}</div>
            {/* Main End */}
            <Aside blogDetails={blogDetails} latestBlogs={latestBlogs} tags={tags} toc={toc} />
          </div>
        </div>
        <Footer siteName={siteName} />
        <Nav />
        <div className="h-16 md:hidden" />
      </div>
    </>
  )
}
