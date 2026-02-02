import React from 'react'
import { BlogDetail, TagsLists, LatestBlogsCardLists } from '@/src/index'
import type { blog, blogData, tag, tableOfContents } from '@/src/index'

type props = {
  blogDetails?: blogData
  latestBlogs?: blog[]
  tags?: tag[]
  tableOfContents?: tableOfContents[]
}

export default function Aside({ blogDetails, latestBlogs, tags, tableOfContents }: props) {
  return (
    <aside className="w-full lg:w-80 space-y-6">
      <BlogDetail
        createdAt={blogDetails?.createdAt}
        updatedAt={blogDetails?.updatedAt}
        tags={blogDetails?.tags}
        tableOfContents={tableOfContents}
      />
      <LatestBlogsCardLists latestBlogs={latestBlogs} />
      <TagsLists tags={tags} />
    </aside>
  )
}
