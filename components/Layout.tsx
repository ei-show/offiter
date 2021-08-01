import { ReactNode } from 'react'
import Header from './Header'
import Aside from './Aside'
import Footer from './Footer'
import Nav from './Nav'
import type { tag, blog } from '@/lib/types'

type props = {
  blogs: blog[],
  tags: tag[],
  children: ReactNode
}

export default function Layout({ blogs, tags, children }: props):JSX.Element {
  const siteName = 'Offiter'
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