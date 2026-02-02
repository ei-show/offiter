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
    <div className="min-h-screen bg-base-200 font-body">
      <Header siteName={siteName} />
      {blogDetails?.title && (
        <div className="flex items-center justify-center bg-base-100 py-8">
          <h2 className="font-head text-2xl md:text-3xl">{blogDetails?.title}</h2>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 min-w-0">{children}</main>
          <Aside blogDetails={blogDetails} latestBlogs={latestBlogs} tags={tags} tableOfContents={tableOfContents} />
        </div>
      </div>
      <Footer siteName={siteName} />
      <Nav />
    </div>
  )
}
