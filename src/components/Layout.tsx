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
    <div className="min-h-screen bg-base-100 font-body text-base-content">
      <Header siteName={siteName} />
      {blogDetails?.title && (
        <div className="container mx-auto px-4 pt-8">
          <h2 className="font-head text-2xl text-base-content">{blogDetails.title}</h2>
        </div>
      )}
      <div className="px-4 py-8">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Main Start */}
          <div className="min-h-screen w-full">{children}</div>
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
