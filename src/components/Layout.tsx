import { ReactNode } from 'react'
import { Header, Aside, Footer, Nav } from '@/src/index'
import type { tag, blog, blogData, tableOfContents } from '@/src/index'

type props = {
  blogDetails?: blogData
  latestBlogs?: blog[]
  tags?: tag[]
  tableOfContents?: tableOfContents[]
  children: ReactNode
}

export default function Layout({ blogDetails, latestBlogs, tags, tableOfContents, children }: props) {
  const siteName = 'Offiter'
  return (
    <div className="bg-gray-50 font-body lg:bg-base-100">
      <Header siteName={siteName} />
      <div className="flex items-center justify-center">
        <h2 className="m-8 font-head text-xl text-gray-700 md:text-2xl">{blogDetails?.title}</h2>
      </div>
      <div className="px-6 py-8">
        <div className="container mx-auto flex justify-around">
          {/* Main Start */}
          <div className="min-h-screen w-full lg:w-8/12">{children}</div>
          {/* Main End */}
          <Aside blogDetails={blogDetails} latestBlogs={latestBlogs} tags={tags} tableOfContents={tableOfContents} />
        </div>
      </div>
      <Footer siteName={siteName} />
      <Nav />
      <div className="h-16 md:hidden" />
    </div>
  )
}
