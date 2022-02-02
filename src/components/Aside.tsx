import React from 'react'
import { BlogDetail, Card, TagsLists } from '@/src/index'
import type { blog, blogData, tag, TOC } from '@/src/index'

type LatestBlogsCardList = {
  latestBlogs?: blog[]
}

const LatestBlogsCardList = ({ latestBlogs }: LatestBlogsCardList): JSX.Element | null => {
  if (latestBlogs === undefined) {
    return null
  }
  return (
    <div className="mb-10 px-8">
      <h2 className="mb-2 font-head text-xl text-gray-700">最新の記事</h2>
      {latestBlogs.map((blog) => (
        <React.Fragment key={blog.id}>
          <div className="pt-2">
            <Card data={blog} small={true} />
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

type props = {
  blogDetails?: blogData
  latestBlogs?: blog[]
  tags?: tag[]
  toc?: TOC[]
}

export default function Aside({ blogDetails, latestBlogs, tags, toc }: props): JSX.Element {
  return (
    <div className="-mx-8 hidden w-4/12 lg:block">
      <BlogDetail
        createdAt={blogDetails?.createdAt}
        updatedAt={blogDetails?.updatedAt}
        tags={blogDetails?.tags}
        toc={toc}
      />

      <LatestBlogsCardList latestBlogs={latestBlogs} />
      <TagsLists tags={tags} />
    </div>
  )
}
